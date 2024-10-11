import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://schools.up.railway.app'], // Permitir solicitudes desde este origen
    }),
  );
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
