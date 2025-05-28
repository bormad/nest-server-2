import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateFlightDto {
	@IsOptional()
	@IsInt()
	price?: number;

	@IsOptional()
	@IsString()
	companyId?: string;

	@IsOptional()
	@IsString()
	departure?: string;

	@IsOptional()
	@IsString()
	destination?: string;

	@IsOptional()
	@IsDate()
	departureAt?: Date;

	@IsOptional()
	@IsDate()
	arrivalAt?: Date;
}
