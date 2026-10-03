import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly configService: ConfigService) {}

  private getCredentials() {
    return {
      cloudName: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'demo',
      apiKey: this.configService.get<string>('CLOUDINARY_API_KEY') || 'mock_api_key',
      apiSecret: this.configService.get<string>('CLOUDINARY_API_SECRET') || 'mock_api_secret',
    };
  }

  generateSignature(paramsToSign: Record<string, string | number>): { signature: string; timestamp: number; apiKey: string; cloudName: string } {
    const { apiKey, apiSecret, cloudName } = this.getCredentials();
    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string | number> = { ...paramsToSign, timestamp };

    const sortedKeys = Object.keys(params).sort();
    const serialized = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
    const signature = crypto.createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');

    return { signature, timestamp, apiKey, cloudName };
  }

  async uploadBase64Image(base64Data: string, folder: string = 'bambifound') {
    const { cloudName, apiKey, apiSecret } = this.getCredentials();

    if (!apiKey || apiKey === 'mock_api_key' || !apiSecret || apiSecret === 'mock_api_secret') {
      this.logger.warn('Cloudinary credentials not configured. Returning fallback mock upload payload.');
      return {
        status: 'success',
        public_id: `${folder}/mock_${Date.now()}`,
        secure_url: `https://res.cloudinary.com/${cloudName}/image/upload/v1234567890/mock_avatar.png`,
        provider: 'cloudinary_sandbox',
      };
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

    const formData = new URLSearchParams();
    formData.append('file', base64Data);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('folder', folder);
    formData.append('signature', signature);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as any;
      if (!response.ok) {
        throw new BadRequestException(data.error?.message || 'Cloudinary upload failed');
      }

      return {
        status: 'success',
        public_id: data.public_id,
        secure_url: data.secure_url,
        provider: 'cloudinary',
      };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      this.logger.error(`Cloudinary upload error: ${(err as Error).message}`);
      throw new BadRequestException(`Failed to upload media to Cloudinary: ${(err as Error).message}`);
    }
  }
}
