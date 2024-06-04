import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class DataAccessService {
  constructor(private readonly prismaService: PrismaClientService) {}

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(authDto: AuthPayloadDto) {
    try {
      const result = await this.prismaService.user.create({
        data: { ...authDto, cart: { create: {} } },
      });
      return result;
    } catch (e) {
      return e.code;
    }
  }
}
