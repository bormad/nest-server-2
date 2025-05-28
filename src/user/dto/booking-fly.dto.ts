import { IsUUID } from 'class-validator';

export class BookingFlyDto {
	@IsUUID()
	flightId: string;
}
