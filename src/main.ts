import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  
  
  // Build CORS origin list from environment + sensible defaults
  const allowedLocalOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];

  // FRONTEND_URL or FRONTEND_URLS can be a single URL or comma-separated list
  const envFrontendRaw = process.env.FRONTEND_URL ?? process.env.FRONTEND_URLS;
  const envFrontend = typeof envFrontendRaw === 'string' ? envFrontendRaw : '';
  const envOrigins = envFrontend
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const origins = Array.from(new Set([...allowedLocalOrigins, ...envOrigins]));

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}
void bootstrap();
