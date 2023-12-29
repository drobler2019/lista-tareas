import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from '../../use-cases/render-todos';
import { renderPending } from '../../use-cases';

const elementsId = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    pendingCount: '#pending-count'
}

export const app = (elementoContenedor) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementsId.TodoList, todos);
        renderPending(elementsId.pendingCount);
    }

    (() => {
        elementoContenedor.innerHTML = html;
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(elementsId.newTodoInput);
    const todoListUL = document.querySelector(elementsId.TodoList);
    const deleteCompleted = document.querySelector(elementsId.clearCompleted);
    const filtersUL = document.querySelectorAll(elementsId.todoFilters);


    //agregar tarea
    newDescriptionInput.addEventListener('keyup', (event) => {
        const { keyCode, target } = event;
        if (keyCode !== 13) return;
        if (target.value.trim().length === 0) return;
        todoStore.addTodo(target.value);
        target.value = '';
        displayTodos();
    });

    //tachar tarea
    todoListUL.addEventListener('click', (event) => {
        const id = event.target.closest('[data-id]').getAttribute('data-id');
        todoStore.toggleTodo(id);
        displayTodos();
    });

    //eliminar tarea
    todoListUL.addEventListener('click', ({ target }) => {
        if (target.className && target.className === 'destroy') {
            const id = target.closest('[data-id]').getAttribute('data-id');
            todoStore.deleteTodo(id);
            displayTodos();
        }
    });

    //eliminar tareas completadas
    deleteCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    //aplicar filtros de búsqueda
    filtersUL.forEach(filter => filter.addEventListener('click', (filter) => {
        filtersUL.forEach(element => element.classList.remove('selected'));
        filter.target.classList.add('selected');
        const fil = filter.target.text;
        switch (fil) {
            case 'Todos':
                todoStore.setFilter(Filters.All);
                break;
            case 'Pendientes':
                todoStore.setFilter(Filters.Pending);
                break;
            case 'Completados':
                todoStore.setFilter(Filters.Completed);
                break;
        }
        displayTodos();
    }));

}