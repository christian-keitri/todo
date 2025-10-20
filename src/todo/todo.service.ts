import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  create(text: string): Todo {
    const todo = { id: Date.now(), text, done: false };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, done: boolean): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.done = done;
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }
}