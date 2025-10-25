from dotenv import load_dotenv
load_dotenv()

from langchain_groq import ChatGroq
from langgraph.graph import StateGraph
from langchain.agents import create_agent
from langgraph.constants import END

from .prompts import *
from .states import *
from .tools import *

llm=ChatGroq(model="openai/gpt-oss-120b")

def planner_agent(state:dict)->dict:
    """Converts user prompt into a structured Plan."""
    user_prompt=state["user_prompt"]
    resp=llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    if(resp is None):
        raise ValueError("Planner agent failed to generate a plan.")
    return {"plan":resp}
    
def architect_agent(state:dict)->dict:
    """Creates TaskPlan from Plan."""
    plan:Plan=state["plan"]
    resp=llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan))
    if(resp is None):
        raise ValueError("Architect agent failed to generate a task plan.")
    resp.plan=plan
    return {"task_plan":resp}

def coder_agent(state:dict)->dict:
    """LangGraph tool-using coder agent."""
    coder_state:CoderState=state.get("coder_state")
    if(coder_state is None):
        coder_state=CoderState(task_plan=state["task_plan"],current_step_idx=0)
    
    steps=coder_state.task_plan.implementation_steps
    if(coder_state.current_step_idx>=len(steps)):
        return {"coder_state":coder_state,"status":"DONE"}
    
    current_step=steps[coder_state.current_step_idx]
    existing_content=read_file.run(current_step.filepath)

    system_prompt=coder_system_prompt()
    user_prompt=(
        f"Task: {current_step.task_description}\n"
        f"File: {current_step.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    tools=[write_file, read_file, list_files, get_current_directory]
    react_agent=create_agent(llm,tools)
    react_agent.invoke({"messages":[{"role":"system","content":system_prompt},
                                    {"role":"user","content":user_prompt}]})

    coder_state.current_step_idx+=1
    return {"coder_state":coder_state}



graph=StateGraph(dict)

graph.add_node("planner",planner_agent)
graph.add_node("architect",architect_agent)
graph.add_node("coder",coder_agent)

graph.add_edge("planner","architect")
graph.add_edge("architect", "coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder": "coder"}
)

graph.set_entry_point("planner")

agent=graph.compile()

if __name__=="__main__":
    final_state=agent.invoke({"user_prompt": "Build a colourful modern todo app in html css and js"},
                          {"recursion_limit": 100})
    print(final_state)