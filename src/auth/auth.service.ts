import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DataAccessService } from 'src/data-access/data-access.service';
import { ERROR_MESSSAGES } from 'src/shared/constants';

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
      throw new HttpException(ERROR_MESSSAGES.EMAIL_OCCUPIED, HttpStatus.CONFLICT);
    }
    const { id, email } = result;
    return this.jwtService.sign({ id, email });
  }
}
