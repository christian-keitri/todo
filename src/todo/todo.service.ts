import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) { }

  findAll(): Promise<Todo[]> {
    return this.todoRepo.find();
  }

  create(text: string): Promise<Todo> {
    const todo = this.todoRepo.create({ text });
    return this.todoRepo.save(todo);
  }

  update(id: number, body: Partial<Todo>): Promise<void> {
    return this.todoRepo.update(id, body).then(() => { });
  }

  delete(id: number): Promise<void> {
    return this.todoRepo.delete(id).then(() => { });
  }
}
