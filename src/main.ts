import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line import/extensions
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
