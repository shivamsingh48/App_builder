# App Builder - AI-Powered Project Generator

[![Python Version](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![LangGraph](https://img.shields.io/badge/LangGraph-0.6.3+-orange.svg)](https://github.com/langchain-ai/langgraph)

An intelligent AI agent system that automatically generates complete web applications from natural language descriptions. Built with LangGraph and powered by Groq's LLM, this tool transforms your ideas into fully functional projects.

## 🚀 Features

- **Natural Language Processing**: Describe your app idea in plain English
- **Multi-Agent Architecture**: Specialized agents for planning, architecture, and coding
- **Automatic Code Generation**: Creates complete, functional web applications
- **File Management**: Safe file operations with path validation
- **Extensible Framework**: Easy to customize and extend for different project types

## 🏗️ Architecture

The App Builder uses a sophisticated multi-agent system:

### 1. **Planner Agent**
- Converts user prompts into structured project plans
- Defines project scope, tech stack, and features
- Creates file structure and dependencies

### 2. **Architect Agent** 
- Breaks down plans into specific implementation tasks
- Defines task dependencies and execution order
- Ensures proper integration between components

### 3. **Coder Agent**
- Executes implementation tasks using LangChain tools
- Reads existing files and writes new/modified content
- Maintains code consistency and integration

## 📁 Project Structure

```
App_Builder/
├── agent/                    # Core agent system
│   ├── __init__.py
│   ├── graph.py             # LangGraph workflow definition
│   ├── states.py            # Pydantic models for state management
│   ├── prompts.py           # Agent-specific prompts
│   └── tools.py             # File operations and utilities
├── generated_project/        # Output directory for generated apps
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── README.md
├── main.py                  # Entry point
├── pyproject.toml           # Project dependencies
└── README.md               # This file
```

## 🛠️ Installation

### Prerequisites
- Python 3.11 or higher
- [uv](https://docs.astral.sh/uv/) package manager (recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd App_Builder
   ```

2. **Install dependencies**
   ```bash
   uv sync
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Get a Groq API key**
   - Visit [Groq Console](https://console.groq.com/)
   - Create an account and generate an API key
   - Add it to your `.env` file

## 🎯 Usage

### Basic Usage

Run the App Builder with a simple command:

```bash
python main.py
```

When prompted, describe your app idea:
```
Enter your project prompt: Build a colorful modern todo app in HTML, CSS, and JavaScript
```

### Advanced Usage

```bash
# Set recursion limit for complex projects
python main.py --recursion-limit 200

# Or use the short form
python main.py -r 200
```

### Example Prompts

- "Create a weather dashboard with API integration"
- "Build a personal finance tracker with charts"
- "Make a recipe organizer with search functionality"
- "Develop a task management system with user authentication"

## 🔧 Configuration

### Recursion Limits
- **Default**: 100 iterations
- **Simple projects**: 50-100
- **Complex projects**: 200-500
- **Enterprise apps**: 500+

### Supported Tech Stacks
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Storage**: localStorage, IndexedDB
- **APIs**: REST, GraphQL integration

## 🛡️ Security Features

- **Path Validation**: Prevents directory traversal attacks
- **Sandboxed Operations**: All file operations are contained within `generated_project/`
- **Safe File Handling**: Automatic directory creation and UTF-8 encoding

## 📊 Generated Project Example

The system recently generated a complete **ColorfulTodo** application with:

- ✅ Responsive design with dark mode
- ✅ CRUD operations for task management
- ✅ Local storage persistence
- ✅ Keyboard shortcuts and accessibility
- ✅ Modern CSS with custom properties
- ✅ Clean, maintainable JavaScript

## 🔄 Workflow Process

1. **Input**: User provides natural language description
2. **Planning**: Planner agent creates structured project plan
3. **Architecture**: Architect agent breaks down into implementation tasks
4. **Coding**: Coder agent executes tasks sequentially
5. **Output**: Complete, functional web application in `generated_project/`

## 🧪 Development

### Running Tests
```bash
# Run the agent directly for testing
python -m agent.graph
```

### Customizing Agents
- Modify prompts in `agent/prompts.py`
- Adjust state models in `agent/states.py`
- Add new tools in `agent/tools.py`

### Extending Functionality
- Add new file types in `tools.py`
- Create specialized agents for different domains
- Implement custom validation rules

## 📈 Performance

- **Typical Generation Time**: 30-120 seconds
- **File Size Limit**: No hard limits (depends on recursion limit)
- **Memory Usage**: Optimized for large codebases
- **Concurrent Operations**: Safe file handling with proper locking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LangGraph](https://github.com/langchain-ai/langgraph) for the multi-agent framework
- [Groq](https://groq.com/) for high-performance LLM inference
- [LangChain](https://github.com/langchain-ai/langchain) for the tool ecosystem
- [Pydantic](https://pydantic.dev/) for robust data validation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/App_Builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/App_Builder/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/App_Builder/wiki)

---

**Happy Building! 🚀**

*Transform your ideas into reality with AI-powered code generation.*
