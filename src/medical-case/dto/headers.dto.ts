import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDto {
  @Expose({ name: 'access-token' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
