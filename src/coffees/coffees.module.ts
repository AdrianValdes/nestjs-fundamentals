import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { ConfigModule } from "@nestjs/config";
import coffeesConfig from "./config/coffees.config";

@Module({
	imports: [
		TypeOrmModule.forFeature([Coffee, Flavor, Event]),
		ConfigModule.forFeature(coffeesConfig), // 👈 Partial registration
	],
	controllers: [CoffeesController],
	providers: [
		{
			provide: CoffeesService,
			useClass: CoffeesService,
		},
	],
	exports: [CoffeesService],
})
export class CoffeesModule {}
