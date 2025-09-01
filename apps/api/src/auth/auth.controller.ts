import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/schemas/user.schema';
import { LocalAuthGuard } from './local-auth.guard';
import { JWTAuthGuard } from './jwt-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req: { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(req.user);
    // set cookie
    res.cookie('access_token', token.accessToken, { httpOnly: true });
    res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
    return {
      message: 'login successfully',
    };
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: { user: User }) {
    return this.authService.getProfile(req.user);
  }
}
