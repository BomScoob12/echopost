import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findOne({ email: email });
    const isValidCredentials = user && user.password === pass;
    console.log(user?._id);
    if (isValidCredentials) {
      return user;
    }

    return null;
  }

  async login(user: UserDocument) {
    const payload = {
      id: user._id,
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
      id: user.id,
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
