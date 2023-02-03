import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	readonly email: string;

	@IsString({ message: '姓名是必须的字符类型' })
	readonly name: string;

	@IsString({ message: '密码是必须的字符类型' })
	readonly password: string;

	@IsString({ message: '验证码是必须的字符类型' })
	readonly verify_code: string;
}
