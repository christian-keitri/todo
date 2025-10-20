import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

describe('TodoService (integration)', () => {
  let service: TodoService;

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
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and fetch a todo from DB', async () => {
    await service.create('Real DB task');
    const todos = await service.findAll();
    expect(todos.some(t => t.text === 'Real DB task')).toBe(true);
  });
});
