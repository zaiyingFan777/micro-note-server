import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255 })
	email: string;

	@Column({ type: 'varchar', length: 255 })
	password: string;

	@CreateDateColumn({ type: 'timestamp' })
	entryTime: Date;
}
