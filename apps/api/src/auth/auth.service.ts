import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string) {
    // Implement your sign-in logic here
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordValid = user && user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwt = '';
    return jwt;
  }
}
