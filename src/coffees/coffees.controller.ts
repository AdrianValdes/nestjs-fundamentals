import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { Public } from "src/common/decorators/public.decorator";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";

// @UsePipes() // apply to all routes in the controller
@Controller("coffees")
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService) {}

	@Public()
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.coffeesService.findAll(paginationQuery);
	}

	@UsePipes(ValidationPipe) // apply to specific routes
	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.coffeesService.findOne(id);
	}

	@Post()
	create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
		return this.coffeesService.create(CreateCoffeeDto);
	}

	@Patch(":id")
	update(
		@Param("id") id: number,
		@Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto, // run the validation pipe exclusively for this parameter
	) {
		return this.coffeesService.update(id, updateCoffeeDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.coffeesService.remove(id);
	}
}
