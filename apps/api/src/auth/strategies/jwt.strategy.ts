import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  id: string;
  sub: string;
  email: string;
  iss: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>('jwt.secret');
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const cookies = req?.cookies as Record<string, unknown> | undefined;
          const token =
            cookies && typeof cookies['access_token'] === 'string'
              ? cookies['access_token']
              : null;
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload): {
    id: string;
    username: string;
    email: string;
  } {
    return {
      id: payload.id,
      username: payload.sub,
      email: payload.email,
    };
  }
}
