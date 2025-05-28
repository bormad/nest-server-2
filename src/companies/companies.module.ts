import { PrismaService } from '@/prisma/prisma.service';
import { UserModule } from '@/user/user.module'; // Импортируем модуль, содержащий UserService
import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
	imports: [UserModule],
	controllers: [CompaniesController],
	providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}
