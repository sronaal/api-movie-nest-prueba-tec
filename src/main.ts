import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  

  app.enableCors({origin:'*'})
  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true
    })
  )

  const config = new DocumentBuilder()
  .setTitle("API Prueba Tecnica Movies")
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3100);
}
void bootstrap();
