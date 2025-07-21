import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsString,
} from 'class-validator';
import { userRole } from 'src/user/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      'Username must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  readonly userName: string;

  @IsOptional()
  @IsEnum(userRole)
  role?: userRole;

  @IsNotEmpty()
  @IsString()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  readonly password: string;

}
