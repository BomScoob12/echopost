import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientId = configService.get<string>('google.clientId');
    const clientSecret = configService.get<string>('google.clientSecret');
    if (!clientId || !clientSecret) {
      throw new Error(
        'Google clientId or clientSecret is not defined in configuration',
      );
    }
    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, emails, photos } = profile;
    const { givenName, familyName } = profile.name || {};

    const user = {
      googleId: id,
      email: emails[0].value,
      name: `${givenName} ${familyName}`,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
