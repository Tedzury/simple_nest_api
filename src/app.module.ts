import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataAccessModule } from './data-access/data-access.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [AuthModule, DataAccessModule, PrismaClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
