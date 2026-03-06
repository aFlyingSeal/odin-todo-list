## Odin Todo List

A simple todo list app built everything that I've learned so far in the JavaScript course from **The Odin Project** curriculum.

Have a good day reading this.

---

## Live Demo: [odin-todo-list](https://aflyingseal.github.io/odin-todo-list/)

## Key Features:

- Crate multiple projects and add tasks to each project.
- Fully dynamic content rendering using vanilla JavaScript.
- Clear separation between application logic and DOM related logic.
- Usage of `localStorage` for storing an user's data.

## Built With:

HTML, CSS, JavaScript (ES Modules) and Webpack (for bundling)

## Run This Project Locally:

1. Clone this repository:

```bash
    git clone https://github.com/aFlyingSeal/odin-todo-list.git
    cd odin-todo-list
```

2. Install dependencies:

```bash
    npm install
```

3. Start the development server:

```bash
    npm run dev
```

## Project Notes:

- Centralized state management used as a single source of truth.
- UI rendering separately entirely from the logic.
- Data persistence handled via `localStorage`.

## Possible Future Features:

- [x] Edit task details (title, description, priority, etc.)
- [ ] Sorting and filtering through tasks on the sidebar.
- [ ] Add a progress bar for each project.
- [ ] Smooth transitions for the page.