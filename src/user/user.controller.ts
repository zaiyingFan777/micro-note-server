import { Controller, Logger, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpResponse } from '../common/httpResponse.interface';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * 校验前端数据：https://blog.csdn.net/kuangshp128/article/details/97132480
	 * 注册接口
	 * @param body email, name, password, verify_code(图形验证码)
	 * @returns
	 */
	@Post('register')
	async addUser(@Body() createUserDto: CreateUserDto): Promise<HttpResponse> {
		Logger.log('-----------注册接口 start--------------');
		Logger.log(createUserDto);
		Logger.log('-----------注册接口 end----------------');

		return await this.userService.addUserMain(createUserDto);
	}
}
