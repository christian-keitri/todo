import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodoService', () => {
  let service: TodoService;

  const mockRepo = {
    find: jest.fn().mockResolvedValue([{ id: 1, text: 'Test', done: false }]),
    create: jest.fn().mockReturnValue({ text: 'Test', done: false }),
    save: jest.fn().mockResolvedValue({ id: 1, text: 'Test', done: false }),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const result = await service.create('Test');
    expect(result.text).toBe('Test');
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should return all todos', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Test');
    expect(mockRepo.find).toHaveBeenCalled();
  });

  it('should update a todo', async () => {
    await service.update(1, { done: true });
    expect(mockRepo.update).toHaveBeenCalledWith(1, { done: true });
  });

  it('should delete a todo', async () => {
    await service.delete(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });
});
