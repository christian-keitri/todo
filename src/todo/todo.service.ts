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

  update(id: number, body: { done?: boolean; text?: string }): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      if (body.done !== undefined) todo.done = body.done;
      if (body.text !== undefined) todo.text = body.text;
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