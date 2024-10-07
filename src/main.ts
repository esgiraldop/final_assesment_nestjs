import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { GlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const datasource = app.get(DataSource);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new GlobalValidationPipe());
  if (datasource.isInitialized) {
    console.log('\n\nConnection with the database established\n\n');
  } else {
    console.log('\n\nThere was an error connecting to the database\n\n');
  }

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}
bootstrap();
