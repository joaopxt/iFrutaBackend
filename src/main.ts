import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('iFruta')
    .setDescription('Seu delivery de hortifruti!')
    .setVersion('0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,PUT,POST,PATCH,DELETE',
    credentials: true,
  });

  const appService = app.get(AppService);
  await appService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
