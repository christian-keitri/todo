import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body('text') text: string) {
    return this.todoService.create(text);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body('done') done: boolean) {
    return this.todoService.update(+id, done);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(+id);
  }
}