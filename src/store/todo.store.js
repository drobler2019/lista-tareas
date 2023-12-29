import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: !localStorage.getItem('state') ? [
        new Todo('estudiando javascript'),
        new Todo('estudiando CSS'),
        new Todo('practicando Java'),
        new Todo('dominando Angular'),
        new Todo('practicando React')
    ] : JSON.parse(localStorage.getItem('state')).todos,
    filter: Filters.All
}

const initStore = () => loadStore();

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return state.todos;

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default: throw new Error('Opción no válida');
    }
}

const loadStore = () => {
    if (!localStorage.getItem('state')) {
        console.log('aún no hay tareas')
        return;
    }

    const { todos = [], filter } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const addTodo = (descripcion) => {
    if (!descripcion) {
        throw new Error('La descripción es requerida');
    }
    state.todos.push(new Todo(descripcion));
    saveStateToLocalStorage();
}

const toggleTodo = (idTodo) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === idTodo) {
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateToLocalStorage();
}

const deleteTodo = (idTodo) => {
    state.todos = state.todos.filter(todo => todo.id != idTodo);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = (filter = Filters.All) => {
    state.filter = filter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => state.filter;

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos
}