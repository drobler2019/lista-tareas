import './style.css';
import { app } from './src/todos/app';
import todoStore from './src/store/todo.store.js';

app(document.querySelector('#app'));
todoStore.initStore();
