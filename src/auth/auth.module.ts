import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { env } from 'process';
import { DataAccessModule } from 'src/data-access/data-access.module';

const secret = env.JWT_SECRET_KEY;
const expiresIn = env.JWT_TOKEN_EXPIRE_TIME;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
    DataAccessModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
