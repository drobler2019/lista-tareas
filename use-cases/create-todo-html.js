export const createTodoHTML = (todo) => {
    
    if (!todo) throw Error('A TODO object is required');

    const { done, descripcion, id } = todo;
    const html = htmlTemplate(done, descripcion);
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);

    if (done)
        liElement.classList.add('completed');

    return liElement;
}

function htmlTemplate(done, descripcion) {
    return `
    <div class="view">
        <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
        <label>${descripcion}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`
}