import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
    if (err || !user) {
      const response = context.switchToHttp().getResponse();
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      response.redirect(`${frontendUrl}/auth/login?error=oauth_canceled`);
      return null;
    }
    return user;
  }
}
