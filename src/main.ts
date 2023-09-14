import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    // forbidNonWhitelisted: true,
  }
  ));

  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies, headers, etc.)
  });

  await app.listen(5000);
}
bootstrap();
