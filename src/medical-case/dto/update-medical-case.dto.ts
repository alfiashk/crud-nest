import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalCaseDto } from './create-medical-case.dto';
import { IsString, IsOptional, Length, IsEnum } from 'class-validator';

export class UpdateMedicalCaseDto extends PartialType(CreateMedicalCaseDto) {
  @IsString()
  @IsOptional()
  @Length(1, 16)
  title?: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  description?: string;
}
