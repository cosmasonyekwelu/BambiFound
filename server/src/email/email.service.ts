import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  private getBrevoConfig() {
    return {
      apiKey: this.configService.get<string>('BREVO_API_KEY'),
      fromEmail: this.configService.get<string>('BREVO_FROM_EMAIL') || 'noreply@bambifound.com',
      fromName: this.configService.get<string>('BREVO_FROM_NAME') || 'BambiFound',
    };
  }

  async sendTransactionalEmail(to: string, subject: string, htmlContent: string) {
    const { apiKey, fromEmail, fromName } = this.getBrevoConfig();

    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
      this.logger.warn(`Brevo API key not configured. Mocking transactional email sending to ${to}`);
      return {
        status: 'mock_sent',
        message: 'Transactional email simulated in sandbox mode',
        provider: 'brevo_sandbox',
        recipient: to,
        subject,
      };
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: [{ email: to }],
          subject,
          htmlContent,
        }),
      });

      const data = (await response.json()) as any;
      if (!response.ok) {
        this.logger.error(`Brevo API error: ${JSON.stringify(data)}`);
        return {
          status: 'error',
          message: data.message || 'Failed to send transactional email',
          provider: 'brevo',
        };
      }

      return {
        status: 'success',
        messageId: data.messageId,
        provider: 'brevo',
      };
    } catch (err) {
      this.logger.error(`Brevo network request error: ${(err as Error).message}`);
      return {
        status: 'error',
        message: (err as Error).message,
        provider: 'brevo',
      };
    }
  }

  async sendWelcomeEmail(toEmail: string, userName?: string) {
    const subject = 'Welcome to BambiFound!';
    const name = userName || 'Builder';
    const htmlContent = `
      <div style="font-family: sans-serif; color: #1E3A2B;">
        <h2>Welcome to BambiFound, ${name}!</h2>
        <p>We are thrilled to have you join our AI-powered startup ecosystem.</p>
        <p>Complete your profile and intent matrix to start getting matched with highly compatible co-founders, talent, and ventures.</p>
        <br/>
        <p>The BambiFound Team</p>
      </div>
    `;
    return this.sendTransactionalEmail(toEmail, subject, htmlContent);
  }

  async sendEmailVerification(toEmail: string, verificationCode: string) {
    const subject = 'Verify your BambiFound Email';
    const htmlContent = `
      <div style="font-family: sans-serif; color: #1E3A2B;">
        <h2>Verify Your Email</h2>
        <p>Use the following verification code to complete your BambiFound registration:</p>
        <h3 style="background: #EAF2ED; padding: 10px; display: inline-block;">${verificationCode}</h3>
        <p>If you did not request this email, please ignore it.</p>
      </div>
    `;
    return this.sendTransactionalEmail(toEmail, subject, htmlContent);
  }

  async sendPaymentReceipt(toEmail: string, planTier: string, reference: string) {
    const subject = `BambiFound Subscription Confirmed - ${planTier}`;
    const htmlContent = `
      <div style="font-family: sans-serif; color: #1E3A2B;">
        <h2>Payment Successful!</h2>
        <p>Your subscription to <strong>${planTier}</strong> tier has been activated.</p>
        <p>Reference: <code>${reference}</code></p>
        <p>Thank you for supporting BambiFound!</p>
      </div>
    `;
    return this.sendTransactionalEmail(toEmail, subject, htmlContent);
  }
}
