import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 开始服务实例
console.log.log('111222');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
