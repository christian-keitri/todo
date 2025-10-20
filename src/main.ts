import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS so your frontend can talk to the backend
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend port
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  await app.listen(3000); // backend port
}
bootstrap();
