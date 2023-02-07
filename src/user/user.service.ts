import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpResponse } from '../common/httpResponse';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	// 依赖注入
	constructor(
		@InjectRepository(User) private readonly user: Repository<User>
	) {}

	// 判断用户是否存在，并添加到数据库
	async register(user: CreateUserDto): Promise<HttpResponse> {
		// 先去数据库查询是否存在该email
		const { email }: { email: string } = user;
		const isCurrentRegisterUserExisted = await this.findUserByEmail(email);
		if (isCurrentRegisterUserExisted) {
			// 存在
			return {
				code: 1,
				data: null,
				msg: '该用户已经注册'
			};
		}
		// 添加数据库
		await this.addUser(user);
		return {
			code: 0,
			data: null,
			msg: '注册成功'
		};
	}

	// 添加用户
	async addUser(user: CreateUserDto): Promise<void> {
		await this.user.save(user);
	}

	// 通过email查询用户
	async findUserByEmail(email: string): Promise<User> | undefined {
		const user = await this.user.find({
			where: {
				email
			}
		});
		return user[0];
	}
}
