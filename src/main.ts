import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 开始服务实例
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
