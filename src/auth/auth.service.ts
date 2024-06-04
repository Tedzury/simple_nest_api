import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DataAccessService } from 'src/data-access/data-access.service';
import { dbErrorMessages } from 'src/shared/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly dataAccessService: DataAccessService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.dataAccessService.getUserByEmail(email);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { id, email } = findUser;
      return this.jwtService.sign({ id, email });
    }
  }

  async createUser(authUserDto: AuthPayloadDto) {
    const result = await this.dataAccessService.createUser(authUserDto);
    if (typeof result === 'string') {
      if (dbErrorMessages[result]) {
        throw new HttpException(dbErrorMessages[result], 409);
      } else {
        throw new HttpException(dbErrorMessages.serverError, 500);
      }
    }
    const { id, email } = result;
    return this.jwtService.sign({ id, email });
  }
}
