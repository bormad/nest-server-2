import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { FlightModule } from './flight/flight.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		FlightModule,
		CompaniesModule,
	],
})
export class AppModule {}
