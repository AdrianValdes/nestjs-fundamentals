import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		const val = Number.parseInt(value, 10);
		if (Number.isNaN(val)) {
			throw new BadRequestException(
				`Validation failed. "${val}" is not an integer.`,
			);
		}
		return val;
	}
}
