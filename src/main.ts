import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dev-only: log which DB host and database name are being used (no credentials)
  if (process.env.NODE_ENV !== 'production') {
    const raw = process.env.DATABASE_URL ?? '';
    try {
      const tmp = raw.replace(/^postgresql:\/\//, 'http://');
      const u = new URL(tmp);
      const dbName = u.pathname?.replace(/\//g, '') || '';
      console.log(`DB host=${u.hostname} db=${dbName}`);
    } catch {
      console.log('DATABASE_URL present but failed to parse');
    }
  }

  // Enable CORS
  app.enableCors();

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Tigat API')
    .setDescription(
      'Tigat Tech backend API — Careers, Projects, Team & Testimonials',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
