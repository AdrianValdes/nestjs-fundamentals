import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";

export class MockCoffeesService {}

const foo = {
	provide: "COFFEE_BRANDS", // 👈
	useValue: ["buddy brew", "nescafe"], // array of coffee brands,
};

@Module({
	imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
	controllers: [CoffeesController],
	providers: [
		{
			provide: CoffeesService,
			useClass: CoffeesService,
			// useFactory: () => ["buddy brew", "nescafe"],
			// useValue: new MockCoffeesService(), // useValue is used to provide a static value
		},
	],
	// providers: [CoffeesService, foo], // To provide a static value
	exports: [CoffeesService],
})
export class CoffeesModule {}
