import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthMethod } from '@prisma/__generated__';
import { hash } from 'argon2';

import { PrismaService } from '@/prisma/prisma.service';

import { BookingFlyDto } from './dto/booking-fly.dto';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		return this.prismaService.user.findMany({
			include: {
				accounts: true,
			},
		});
	}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: {
				accounts: true,
			},
		});

		if (!user) {
			throw new NotFoundException('Пользователь не найден.');
		}

		return user;
	}

	public async bookFlight(userId: string, dto: BookingFlyDto) {
		const flight = await this.prismaService.flight.findUnique({
			where: { id: dto.flightId },
		});

		if (!flight) {
			throw new NotFoundException('Рейс не найден.');
		}

		return this.prismaService.user.update({
			where: { id: userId },
			data: {
				flights: {
					connect: { id: dto.flightId },
				},
			},
		});
	}

	public async findByEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: { email },
			include: {
				accounts: true,
			},
		});

		return user;
	}

	public async create(
		email: string,
		password: string,
		displayName: string,
		picture: string,
		method: AuthMethod,
		isVerified: boolean,
	) {
		const user = await this.prismaService.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				displayName,
				picture,
				method,
				isVerified,
			},
			include: {
				accounts: true,
			},
		});

		return user;
	}

	public async update(userId: string, dto: UpdateUserDto) {
		const user = await this.findById(userId);

		const updatedUser = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				email: dto.email,
				displayName: dto.name,
				isTwoFactorEnabled: dto.isTwoFactorEnabled,
			},
		});

		return updatedUser;
	}

	public async updateByAdmin(id: string, dto: UpdateUserByAdminDto) {
		const user = await this.findById(id);

		const updatedUser = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				email: dto.email,
				displayName: dto.name,
				isTwoFactorEnabled: dto.isTwoFactorEnabled,
				role: dto.role,
				isVerified: dto.isVerified,
			},
		});

		return updatedUser;
	}

	public async delete(id: string) {
		await this.findById(id);
		await this.prismaService.user.delete({
			where: { id },
		});
	}
}
