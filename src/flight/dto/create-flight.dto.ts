import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightDto {
	@IsInt()
	@IsNotEmpty()
	price: number;

	@IsString()
	@IsNotEmpty()
	companyId: string;

	@IsString()
	@IsNotEmpty()
	departure: string;

	@IsString()
	@IsNotEmpty()
	destination: string;

	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsNotEmpty()
	departureAt: Date;

	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsNotEmpty()
	arrivalAt: Date;
}
