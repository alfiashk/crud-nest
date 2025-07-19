import { IsMongoId, IsString } from 'class-validator';

export class idParamDto {
  @IsMongoId({ message: 'id must be a valid mongo id' })
  @IsString()
  id: string;
}
