import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		const flights = await this.prismaService.flight.findMany({
			include: {
				company: true,
				passengers: true,
			},
		});

		return flights;
	}

	public async findById(id: string) {
		const flight = await this.prismaService.flight.findUnique({
			where: { id },
			include: {
				company: true,
				passengers: true,
			},
		});

		if (!flight) {
			throw new NotFoundException('Flight not found');
		}

		return flight;
	}

	public async create(dto: CreateFlightDto) {
		return this.prismaService.flight.create({
			data: {
				price: dto.price,
				info: dto.info,
				company: {
					connect: { id: dto.companyId },
				},
			},
			include: {
				company: true,
			},
		});
	}

	public async update(id: string, dto: UpdateFlightDto) {
		await this.findById(id);

		return this.prismaService.flight.update({
			where: { id },
			data: {
				price: dto.price,
				info: dto.info,
				companyId: dto.companyId,
			},
			include: {
				company: true,
			},
		});
	}

	public async delete(id: string) {
		await this.findById(id);
		await this.prismaService.flight.delete({ where: { id } });
	}

	public async bookFlight(userId: string, flightId: string) {
		await this.findById(flightId);

		return this.prismaService.flight.update({
			where: { id: flightId },
			data: {
				passengers: {
					connect: { id: userId },
				},
			},
			include: {
				passengers: true,
			},
		});
	}

	public async assignToUser(userId: string, flightId: string) {
		return this.bookFlight(userId, flightId);
	}

	public async removeFromUser(userId: string, flightId: string) {
		await this.findById(flightId);

		return this.prismaService.flight.update({
			where: { id: flightId },
			data: {
				passengers: {
					disconnect: { id: userId },
				},
			},
		});
	}
}
