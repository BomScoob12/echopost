import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    const isValidCredentials = user && user.password === pass;

    if (isValidCredentials) {
      return {
        email: user.email,
        username: user.username,
      } as User;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  // google user
  async googleLogin(user: any) {
    const userData = await this.usersService.findOne({ email: user.email });

    if (!userData) {
      this.usersService.save({
        username: user.name,
        email: user.email,
        googleId: user.googleId,
      } as User);
    }

    const payload = {
      sub: user.name,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
