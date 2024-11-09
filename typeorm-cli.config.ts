import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity";
import { CoffeeRefactor1731158639430 } from "src/migrations/1731158639430-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "pass123",
	database: "postgres",
	entities: [Coffee, Flavor],
	migrations: [CoffeeRefactor1731158639430],
});
