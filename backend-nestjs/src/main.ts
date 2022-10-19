// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//
//   app.enableCors({
//     origin: ['http://localhost:3000'],
//     methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
//     credentials: true,
//   });
//
//   app.use(cookieParser());
//
//   await app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
//     console.log("http://localhost:3001")
//   });
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './utils/config/configuration';
import * as cookieParser from 'cookie-parser';
import { whitelistCors } from './utils/config/cors-config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)) as NestExpressApplication;
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: whitelistCors.address,
    methods: whitelistCors.methods,
    credentials: true,
    optionsSuccessStatus: 200,
  });
  await app.listen(
    configuration().server.port,
    configuration().server.domain,
    () => {
      console.log('Your .ENV:');
      console.log(configuration());
      console.log('Your CORS whitelist:');
      console.log(whitelistCors.address);
      console.log(whitelistCors.methods);
    },
  );
}
(async () => {
  await bootstrap();
})();

