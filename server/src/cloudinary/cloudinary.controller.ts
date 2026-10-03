import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('media')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('signature')
  getUploadSignature(@Body('folder') folder: string = 'bambifound') {
    return this.cloudinaryService.generateSignature({ folder });
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadMedia(@Body('file') file: string, @Body('folder') folder: string = 'bambifound') {
    return this.cloudinaryService.uploadBase64Image(file, folder);
  }
}
