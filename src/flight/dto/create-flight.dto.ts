import { IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateFlightDto {
	@IsInt()
	@IsNotEmpty()
	price: number;

	@IsObject()
	@IsNotEmpty()
	info: Record<string, any>;

	@IsString()
	@IsNotEmpty()
	companyId: string;
}
