import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsEnum(['done', 'in-progress'])
  status: string;
}
