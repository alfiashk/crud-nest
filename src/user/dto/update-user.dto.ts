import { userRole } from '../user.schema';
import { IsOptional, IsEnum, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      'Username must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  userName: string;

  @IsOptional()
  @IsEnum(userRole)
  role?: userRole;
}
