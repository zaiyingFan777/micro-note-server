import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty({ message: 'email不能为空' })
	@IsEmail()
	readonly email: string;

	@IsNotEmpty({ message: '姓名不能为空' })
	@IsString({ message: '姓名是必须的字符类型' })
	readonly name: string;

	@IsNotEmpty({ message: '密码不能为空' })
	@IsString({ message: '密码是必须的字符类型' })
	readonly password: string;

	@IsNotEmpty({ message: '验证码不能为空' })
	@IsString({ message: '验证码是必须的字符类型' })
	readonly verify_code: string;
}
