import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { CoffeesModule } from "./coffees/coffees.module";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import appConfig from "./config/app.config";

ConfigModule.forRoot({
	validationSchema: Joi.object({
		DATABASE_HOST: Joi.required(),
		DATABASE_PORT: Joi.number().default(5432),
	}),
});
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig],
		}),
		CoffeesModule,
		CoffeeRatingModule,
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "postgres", // type of our database
				host: process.env.DATABASE_HOST,
				port: +process.env.DATABASE_PORT,
				username: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				autoLoadEntities: true, // models will be loaded automatically
				synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
			}),
		}),
		CommonModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// {
		// 	provide: APP_PIPE,
		// 	useClass: ValidationPipe, // apply to all routes in the application
		// },
	],
})
export class AppModule {}
