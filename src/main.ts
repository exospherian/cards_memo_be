import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      },
    }),
  );

  app.enableCors();
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('MEMO_DEV')
    .setDescription('The MEMO_DEV API description')
    .setVersion('1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
