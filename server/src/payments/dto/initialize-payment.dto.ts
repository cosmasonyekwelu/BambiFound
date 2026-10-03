import { IsString, IsOptional, IsIn } from 'class-validator';

export class InitializePaymentDto {
  @IsString()
  @IsIn(['PLUS', 'PRO'])
  planTier: string = 'PLUS';

  @IsOptional()
  @IsString()
  callbackUrl?: string;
}
