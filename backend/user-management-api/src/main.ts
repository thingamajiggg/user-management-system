import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for front-end
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3001);
}
bootstrap();