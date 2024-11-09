import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(["name", "type"])
@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type: string;

	// @Index()
	@Column()
	name: string;

	@Column("json")
	// biome-ignore lint/suspicious/noExplicitAny: <temp any>
	payload: Record<string, any>;
}
