import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/users/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    console.log(email, password);
    const user = await this.authService.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
