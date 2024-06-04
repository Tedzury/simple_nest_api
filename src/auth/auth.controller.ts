import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  signup(@Body() authPayloadDto: AuthPayloadDto) {
    return this.authService.createUser(authPayloadDto);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  getStatus(@Req() req: Request) {
    return req.user;
  }
}
