import todoStore, { Filters } from "../src/store/todo.store";

let element = null;

export const renderPending = (id) => {
    if (!element)
        element = document.querySelector(id);

    if (!element) throw new Error(`Element ${id} not found`);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}