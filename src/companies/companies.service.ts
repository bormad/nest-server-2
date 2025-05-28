import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		return this.prismaService.company.findMany();
	}

	public async findById(id: string) {
		const company = await this.prismaService.company.findUnique({
			where: { id },
		});

		if (!company) {
			throw new NotFoundException('Компания не найдена.');
		}

		return company;
	}

	public async create(dto: CreateCompanyDto) {
		return this.prismaService.company.create({
			data: {
				name: dto.name,
				logo: dto.logo,
			},
		});
	}

	public async update(id: string, dto: UpdateCompanyDto) {
		const existingCompany = await this.findById(id);

		return this.prismaService.company.update({
			where: { id },
			data: {
				name: dto.name || existingCompany.name,
				logo: dto.logo || existingCompany.logo,
			},
		});
	}

	public async delete(id: string) {
		await this.findById(id);
		return this.prismaService.company.delete({ where: { id } });
	}
}
