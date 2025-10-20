import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

describe('TodoController', () => {
  let controller: TodoController;

  const mockRepo = {
    find: jest.fn().mockResolvedValue([{ id: 1, text: 'Test', done: false }]),
    create: jest.fn().mockReturnValue({ text: 'Test', done: false }),
    save: jest.fn().mockResolvedValue({ id: 1, text: 'Test', done: false }),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
