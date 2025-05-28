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

import { BookingFlyDto } from './dto/booking-fly.dto';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get()
	public async findAll() {
		return this.userService.findAll();
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') id: string) {
		return this.userService.findById(id);
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	) {
		return this.userService.update(userId, dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	public async updateByAdmin(
		@Param('id') id: string,
		@Body() dto: UpdateUserByAdminDto,
	) {
		return this.userService.updateByAdmin(id, dto);
	}

	@Authorization()
	@Post('/:userId/book-flight')
	@HttpCode(HttpStatus.CREATED)
	public async bookFlight(
		@Param('userId') userId: string,
		@Body() dto: BookingFlyDto,
	) {
		return this.userService.bookFlight(userId, dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	public async delete(@Param('id') id: string) {
		return this.userService.delete(id);
	}
}
