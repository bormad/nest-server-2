import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
	imports: [UserModule],
	controllers: [FlightController],
	providers: [FlightService],
})
export class FlightModule {}
