import { UserRole } from '@prisma/__generated__';
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
} from 'class-validator';

export class UpdateUserByAdminDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsBoolean()
	isTwoFactorEnabled?: boolean;

	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;

	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;
}
