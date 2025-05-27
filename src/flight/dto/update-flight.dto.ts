import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateFlightDto {
	@IsOptional()
	@IsInt()
	price?: number;

	@IsOptional()
	@IsObject()
	info?: Record<string, any>;

	@IsOptional()
	@IsString()
	companyId?: string;
}
