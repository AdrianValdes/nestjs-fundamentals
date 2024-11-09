import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type: string;

	@Column()
	name: string;

	@Column("json")
	// biome-ignore lint/suspicious/noExplicitAny: <temp any>
	payload: Record<string, any>;
}
