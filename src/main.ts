import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'; // ValidationPipe

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// 设置api端点的前缀
	app.setGlobalPrefix('/api/v1');
	// 全局使用管道、校验接口
	// app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000, () => {
		Logger.log('服务已经启动,请访问localhost:3000');
	});
}
bootstrap();
