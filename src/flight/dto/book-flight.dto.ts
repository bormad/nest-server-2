import { IsNotEmpty, IsString } from 'class-validator';

export class BookFlightDto {
	@IsString()
	@IsNotEmpty()
	flightId: string;
}
