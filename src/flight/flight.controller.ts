import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { UserRole } from '@prisma/__generated__';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';

import { BookFlightDto } from './dto/book-flight.dto';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
	constructor(private readonly flightService: FlightService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async findAll() {
		return this.flightService.findAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') id: string) {
		return this.flightService.findById(id);
	}

	@Authorization()
	@Post('book')
	@HttpCode(HttpStatus.CREATED)
	public async bookFlight(
		@Authorized('id') userId: string,
		@Body() dto: BookFlightDto,
	) {
		return this.flightService.bookFlight(userId, dto.flightId);
	}

	@Authorization(UserRole.ADMIN)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateFlightDto) {
		return this.flightService.create(dto);
	}

	@Authorization(UserRole.ADMIN)
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	public async update(@Param('id') id: string, @Body() dto: UpdateFlightDto) {
		return this.flightService.update(id, dto);
	}

	@Authorization(UserRole.ADMIN)
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async delete(@Param('id') id: string) {
		return this.flightService.delete(id);
	}

	@Authorization(UserRole.ADMIN)
	@Post('assign-to-user')
	@HttpCode(HttpStatus.OK)
	public async assignToUser(
		@Body() dto: { userId: string; flightId: string },
	) {
		return this.flightService.assignToUser(dto.userId, dto.flightId);
	}

	@Authorization(UserRole.ADMIN)
	@Delete('remove-from-user')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async removeFromUser(
		@Body() dto: { userId: string; flightId: string },
	) {
		return this.flightService.removeFromUser(dto.userId, dto.flightId);
	}
}
