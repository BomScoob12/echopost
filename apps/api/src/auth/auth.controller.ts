import {
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
import type { Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req: { user: User },
    // get response like express to setting cookie data
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(req.user);
    // set cookie
    res.cookie('access_token', token.accessToken, { httpOnly: true });
    res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async googleAuth(@Request() req) {
    // Init google login page
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async googleAuthRedirect(
    @Request() req: { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.googleLogin(
      req.user,
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.redirect('http://localhost:3000/login');
  }
}
