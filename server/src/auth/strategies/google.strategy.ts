import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

export interface OAuthUserPayload {
  provider: 'GOOGLE' | 'GITHUB';
  providerAccountId: string;
  email: string | null;
  fullName: string | null;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID', 'placeholder-google-client-id'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET', 'placeholder-google-client-secret'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL', 'http://localhost:4000/api/auth/google/callback'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, displayName, emails } = profile;
    const email = emails && emails.length > 0 ? emails[0].value : null;

    const userPayload: OAuthUserPayload = {
      provider: 'GOOGLE',
      providerAccountId: id,
      email,
      fullName: displayName || null,
    };

    done(null, userPayload);
  }
}
