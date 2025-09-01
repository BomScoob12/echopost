import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/schemas/user.schema';
import { LocalAuthGuard } from './local-auth.guard';
import { JWTAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: { user: User }) {
    return this.authService.getProfile(req.user);
  }
}
