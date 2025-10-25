// app.js – Core logic for ColorfulTodo
// Implements data model, persistence, rendering, UI interactions, shortcuts, and accessibility.

// 1. Data Model
class Todo {
  /**
   * @param {string} id - Unique identifier
   * @param {string} text - Todo description
   * @param {boolean} [completed=false] - Completion status
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

/** @type {Todo[]} */
let todos = [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// 2. LocalStorage Persistence
const STORAGE_KEY = 'colorfulTodo.todos';
const THEME_KEY = 'colorfulTodo.theme';

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    // Re‑instantiate as Todo objects
    return parsed.map(t => new Todo(t.id, t.text, t.completed));
  } catch (e) {
    console.error('Failed to parse stored todos', e);
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

// 3. DOM References (cached)
const $input = document.getElementById('new-todo-input');
const $list = document.getElementById('todo-list');
const $filterButtons = document.querySelectorAll('.filter-btn');
const $clearCompleted = document.getElementById('clear-completed');
const $darkModeToggle = document.getElementById('dark-mode-toggle');

// 4. Render Function
function render(filter = currentFilter) {
  // Update filter state
  currentFilter = filter;

  // Clear list
  $list.innerHTML = '';
  $list.setAttribute('role', 'list');

  todos.forEach(todo => {
    // Apply filter logic
    const shouldShow =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    if (!shouldShow) return;

    const $li = document.createElement('li');
    $li.setAttribute('role', 'listitem');
    $li.dataset.id = todo.id;
    $li.className = todo.completed ? 'completed' : '';

    // Checkbox button
    const $toggleBtn = document.createElement('button');
    $toggleBtn.className = 'todo-action toggle-btn';
    $toggleBtn.setAttribute('aria-label', todo.completed ? 'Mark as incomplete' : 'Mark as complete');
    $toggleBtn.textContent = todo.completed ? '✔️' : '☐';
    $toggleBtn.dataset.action = 'toggle';
    $toggleBtn.dataset.id = todo.id;

    // Text span (editable)
    const $text = document.createElement('span');
    $text.className = 'todo-text';
    $text.contentEditable = 'true';
    $text.dataset.id = todo.id;
    $text.textContent = todo.text;
    $text.setAttribute('aria-label', 'Edit todo');
    // Store original for cancel on Esc
    $text.dataset.original = todo.text;

    // Delete button
    const $deleteBtn = document.createElement('button');
    $deleteBtn.className = 'todo-action delete-btn';
    $deleteBtn.setAttribute('aria-label', 'Delete task');
    $deleteBtn.textContent = '🗑️';
    $deleteBtn.dataset.action = 'delete';
    $deleteBtn.dataset.id = todo.id;

    // Assemble
    $li.appendChild($toggleBtn);
    $li.appendChild($text);
    $li.appendChild($deleteBtn);
    $list.appendChild($li);
  });

  // Update filter button ARIA pressed state
  $filterButtons.forEach(btn => {
    const btnFilter = btn.dataset.filter;
    btn.setAttribute('aria-pressed', btnFilter === filter ? 'true' : 'false');
  });
}

// 5. Event Handlers & Attachments
function attachEventListeners() {
  // Add Todo – Enter or Ctrl+Enter on input
  $input.addEventListener('keydown', e => {
    const isEnter = e.key === 'Enter';
    const isCtrlEnter = e.key === 'Enter' && (e.ctrlKey || e.metaKey);
    if (isEnter || isCtrlEnter) {
      const text = $input.value.trim();
      if (text) {
        addTodo(text);
        e.preventDefault();
      }
    }
  });

  // Delegated events for list actions (toggle, delete, edit)
  $list.addEventListener('click', e => {
    const target = /** @type HTMLElement */ (e.target);
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (!action || !id) return;

    if (action === 'toggle') {
      toggleTodo(id);
    } else if (action === 'delete') {
      deleteTodo(id);
    }
  });

  // Editing – blur or Enter key on .todo-text
  $list.addEventListener('blur', e => {
    const target = /** @type HTMLElement */ (e.target);
    if (target.classList.contains('todo-text')) {
      commitEdit(target);
    }
  }, true); // capture to get blur

  $list.addEventListener('keydown', e => {
    const target = /** @type HTMLElement */ (e.target);
    if (!target.classList.contains('todo-text')) return;
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent newline
      target.blur(); // trigger blur handling
    } else if (e.key === 'Escape') {
      // Cancel edit – revert to original
      const original = target.dataset.original;
      if (original !== undefined) {
        target.textContent = original;
      }
      target.blur();
    }
  });

  // Filter buttons
  $filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      render(filter);
    });
  });

  // Clear completed
  $clearCompleted.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
  });

  // Dark mode toggle
  $darkModeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    $darkModeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    saveTheme(next);
  });
}

function addTodo(text) {
  const id = crypto.randomUUID();
  const todo = new Todo(id, text);
  todos.push(todo);
  saveTodos();
  render();
  // After render, focus the newly added item's text span
  const $newSpan = $list.querySelector(`span.todo-text[data-id="${id}"]`);
  if ($newSpan) {
    $newSpan.focus();
    // Move caret to end
    const range = document.createRange();
    range.selectNodeContents($newSpan);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  // Clear input field
  $input.value = '';
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index > -1) {
    // Optional: add removing class for animation before splice
    const $li = $list.querySelector(`li[data-id="${id}"]`);
    if ($li) {
      $li.classList.add('removing');
      $li.addEventListener('animationend', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
      }, { once: true });
    } else {
      todos.splice(index, 1);
      saveTodos();
      render();
    }
  }
}

function commitEdit($el) {
  const id = $el.dataset.id;
  const newText = $el.textContent.trim();
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  if (newText && newText !== todo.text) {
    todo.text = newText;
    saveTodos();
    render();
  } else {
    // Revert to original if empty
    $el.textContent = todo.text;
  }
}

// 7. Initialization
function init() {
  todos = loadTodos();
  const savedTheme = loadTheme();
  document.documentElement.dataset.theme = savedTheme;
  $darkModeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
  render();
  attachEventListeners();
}

// Execute init after script load (defer ensures DOM ready)
init();
