import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'founder@bambifound.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User account password' })
  @IsString()
  password!: string;
}
