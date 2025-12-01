import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Ajustando o Fuso Horário do BD
  process.env.TZ = '-03:00';

  //Habilitando Validações Globais
  app.useGlobalPipes(new ValidationPipe());

  //Habilitando CORS
  app.enableCors();

  //Iniciando a aplicação na porta 4000
  await app.listen(4000);
}

bootstrap();
