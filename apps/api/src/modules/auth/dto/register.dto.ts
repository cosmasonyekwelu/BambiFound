import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsArray } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'founder@bambifound.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User account password' })
  @IsString()
  password!: string;

  @ApiPropertyOptional({ example: 'Cosmas', description: 'User full name' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: ['builder', 'talent'], description: 'Selected user intents' })
  @IsOptional()
  @IsArray()
  intents?: string[];
}
