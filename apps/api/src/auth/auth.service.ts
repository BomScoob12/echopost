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

  async getProfile(user: User): Promise<User | null> {
    return this.usersService.findOneByEmail(user?.email);
  }
}
