import { Controller, Logger, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpResponse } from '../common/httpResponse';
import { ValidationPipe } from '../pipe/validation.pipe';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * 注册接口
	 * @param body email, name, password, verify_code(图形验证码)
	 * @returns
	 */
	@UsePipes(new ValidationPipe()) // 使用管道验证
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<HttpResponse> {
		Logger.log('-----------注册接口 start--------------');
		Logger.log(createUserDto);
		Logger.log('-----------注册接口 end----------------');

		return await this.userService.register(createUserDto);
	}
}
