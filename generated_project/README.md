# ColorfulTodo

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://your-username.github.io/ColorfulTodo/)
[![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen)](https://www.npmjs.com/package/colorfultodo)
[![GitHub pages](https://img.shields.io/badge/GitHub%20Pages-✓-blue)](https://your-username.github.io/ColorfulTodo/)

---

## Description

**ColorfulTodo** is a vibrant, responsive, and accessible web‑based todo list application. It lets users create, edit, filter, and manage tasks with a splash of color and a sleek dark‑mode option. All data is persisted locally using `localStorage`, and the UI is fully keyboard‑driven for power‑users.

---

## Demo

![ColorfulTodo Demo](demo.gif)

*The above GIF showcases the bright UI, dark mode toggle, and keyboard shortcuts in action.*

---

## Tech Stack

- **HTML5** – Semantic markup.
- **CSS3** – Flexbox/Grid layout, custom properties for theming, and responsive design.
- **JavaScript (ES6+)** – Core application logic, DOM manipulation, and `localStorage` persistence.

---

## Features

- ✅ **Responsive UI** – Works on mobile, tablet, and desktop.
- ✅ **CRUD Operations** – Add, edit, delete, and mark tasks as completed.
- ✅ **Filters** – View All, Active, or Completed tasks.
- ✅ **Persistent Storage** – Tasks are saved in `localStorage` and restored on page load.
- ✅ **Keyboard Shortcuts** –
  - `Enter` – Add a new task.
  - `Ctrl + Enter` – Save edited task.
  - `Esc` – Cancel editing.
  - `Ctrl + D` – Toggle dark mode.
- ✅ **Accessibility** – ARIA roles, focus management, and sufficient color contrast.
- ✅ **Dark Mode** – One‑click toggle with automatic system preference detection.
- ✅ **Colorful UI** – Each task gets a random pastel background for a lively look.

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ColorfulTodo.git
   cd ColorfulTodo
   ```
2. **Open the app**
   - Simply double‑click `index.html` to open it in your default browser, **or**
   - Serve it with a static server (recommended for live reload):
     ```bash
     npx serve .
     ```
3. The application will be available at `http://localhost:5000` (or the port shown by `serve`).

---

## Usage

### Adding a Task
- Type your task description in the input field at the top and press **Enter**.

### Editing a Task
- Click the edit icon (✏️) or focus the task and press **Ctrl + Enter**.
- Modify the text and press **Ctrl + Enter** again to save, or **Esc** to cancel.

### Deleting a Task
- Click the trash icon (🗑️) next to the task.

### Completing a Task
- Click the checkbox or press **Space** while the task is focused.

### Filtering
- Use the filter buttons (All / Active / Completed) at the bottom to switch views.

### Dark Mode
- Click the moon/sun icon in the header **or** press **Ctrl + D**.

---

## Development

### Running a Local Development Server
```bash
npx serve .
```
This serves the static files and provides live reload via your browser's refresh.

### Project Structure
```
├─ index.html        # Main HTML entry point
├─ styles.css        # Global stylesheet (includes dark‑mode variables)
├─ app.js            # Core JavaScript logic (CRUD, storage, shortcuts)
└─ README.md         # Project documentation (you are reading it!)
```

### Editing Files
- **HTML** – `index.html` contains the layout and ARIA attributes.
- **CSS** – `styles.css` holds theming, responsive grid, and animation rules.
- **JS** – `app.js` implements the todo logic. Feel free to modularise further if needed.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository and create a new branch for your feature or bug‑fix.
2. **Write clear commit messages** – use the present tense (e.g., "Add dark‑mode toggle").
3. **Maintain code style** – semicolons are required; use `eslint` if you wish.
4. **Test** your changes locally before submitting a pull request.
5. **Open a Pull Request** – describe the change, reference any related issues, and ensure the CI (if added later) passes.

---

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## Acknowledgements

- Icons by **[Font Awesome](https://fontawesome.com/)**.
- Color palette inspiration from **[Coolors](https://coolors.co/)**.
- Dark‑mode detection pattern based on the **MDN Web Docs** guide.

---

*Happy coding! 🎉*