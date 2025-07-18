import { IsNotEmpty, Matches, IsString } from "class-validator";

export class LoginDto {
    
        @IsNotEmpty()
        @IsString()
        readonly userName: string;
    
        @IsNotEmpty()
        @IsString()
        @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        })
        readonly password: string;
    
     }
    