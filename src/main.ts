import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/websockets/adapters';
import { ApplicationModule } from './app.module';
import { EnvironmentService } from './environment.variables';

import { join } from 'path';

async function bootstrap() {
  const environment = new EnvironmentService('.env');
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '/../public'));
  //app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  app.setGlobalPrefix('api');
  await app.listen(environment.get('HTTP_SERVER_PORT'));
  console.log(`Environment -> ${environment.get('NODE_ENV')}`);
  console.log(`Port -> ${environment.get('HTTP_SERVER_PORT')}`);
}
bootstrap();
