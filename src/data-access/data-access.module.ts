import { Module } from '@nestjs/common';
import { DataAccessService } from './data-access.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [PrismaClientModule],
  providers: [DataAccessService],
  exports: [DataAccessService],
})
export class DataAccessModule {}
