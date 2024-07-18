import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lista de orígenes permitidos
  const allowedOrigins = [
    'http://127.0.0.1:8080',
    'http://localhost:4200', // Añade aquí otros orígenes permitidos
    'https://bkbt-production.up.railway.app/api/action/find',
    'https://bkbt-production.up.railway.app'
  ];

  // Habilitar CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (por ejemplo, desde herramientas como Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(3000);
}
bootstrap();
