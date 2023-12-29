import { v4 as uuid } from "uuid";

export class Todo {
    constructor(descripcion) {
        this.id = uuid();
        this.descripcion = descripcion;
        this.fechaCreacion = new Date();
        this.done = false;
    }
}