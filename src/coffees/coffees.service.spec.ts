import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesService } from "./coffees.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Flavor } from "./entities/flavor.entity";
import { Coffee } from "./entities/coffee.entity";
import { ConfigModule } from "@nestjs/config";
import coffeesConfig from "./config/coffees.config";
import { NotFoundException } from "@nestjs/common";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
	findOne: jest.fn(),
	create: jest.fn(),
});
describe("CoffeesService", () => {
	let service: CoffeesService;
	let coffeeRepository: MockRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forFeature(coffeesConfig)], // Mock ConfigModule registration,
			providers: [
				CoffeesService,
				{ provide: DataSource, useValue: {} },
				{
					provide: getRepositoryToken(Flavor),
					useValue: createMockRepository(),
				}, // 👈
				{
					provide: getRepositoryToken(Coffee),
					useValue: createMockRepository(),
				}, // 👈
				// { provide: getRepositoryToken(Event), useValue: {} },
			],
		}).compile();

		service = module.get<CoffeesService>(CoffeesService);
		coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findOne", () => {
		describe("when coffee with ID exists", () => {
			it("should return the coffee object", async () => {
				const coffeeId = 1;
				const expectedCoffee = {};

				coffeeRepository.findOne.mockReturnValue(expectedCoffee);
				const coffee = await service.findOne(coffeeId);
				expect(coffee).toEqual(expectedCoffee);
			});
		});
		describe("otherwise", () => {
			it('should throw the "NotFoundException"', async () => {
				const coffeeId = 1;
				coffeeRepository.findOne.mockReturnValue(undefined);

				try {
					await service.findOne(coffeeId);
					expect(false).toBeTruthy(); // we should never hit this line
				} catch (err) {
					expect(err).toBeInstanceOf(NotFoundException);
					expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
				}
			});
		});
	});
});
