import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

describe('TodoController (integration)', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'todo.db',
          entities: [Todo],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Todo]),
      ],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and return todos from DB', async () => {
    await controller.createTodo('Integration test task');
    const todos = await controller.getTodos();
    expect(todos.some(t => t.text === 'Integration test task')).toBe(true);
  });
});
