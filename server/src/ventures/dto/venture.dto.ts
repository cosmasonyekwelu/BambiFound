import { IsString, IsOptional, IsArray } from 'class-validator';

export class VentureDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  stage?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  lookingFor?: string[];

  @IsString()
  @IsOptional()
  website?: string;
}
