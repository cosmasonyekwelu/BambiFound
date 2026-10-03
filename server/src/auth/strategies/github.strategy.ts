import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { OAuthUserPayload } from './google.strategy.js';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID', 'placeholder-github-client-id'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET', 'placeholder-github-client-secret'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL', 'http://localhost:4000/api/auth/github/callback'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { id, displayName, username, emails } = profile;
    let email = emails && emails.length > 0 ? emails[0].value : null;

    if (!email && accessToken) {
      try {
        const response = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': 'BambiFound-App',
          },
        });
        if (response.ok) {
          const emailData = (await response.json()) as Array<{
            email: string;
            primary: boolean;
            verified: boolean;
          }>;
          const primaryObj =
            emailData.find((e) => e.primary && e.verified) ||
            emailData.find((e) => e.verified) ||
            emailData[0];
          if (primaryObj) {
            email = primaryObj.email;
          }
        }
      } catch {
        // Fallback if fetch fails
      }
    }

    const userPayload: OAuthUserPayload = {
      provider: 'GITHUB',
      providerAccountId: String(id),
      email,
      fullName: displayName || username || null,
    };

    done(null, userPayload);
  }
}
