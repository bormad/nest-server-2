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

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
	constructor(private readonly companyService: CompaniesService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async findAll() {
		return this.companyService.findAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') id: string) {
		return this.companyService.findById(id);
	}

	@Authorization(UserRole.ADMIN)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateCompanyDto) {
		return this.companyService.create(dto);
	}

	@Authorization(UserRole.ADMIN)
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateCompanyDto,
	) {
		return this.companyService.update(id, dto);
	}

	@Authorization(UserRole.ADMIN)
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async delete(@Param('id') id: string) {
		return this.companyService.delete(id);
	}
}
