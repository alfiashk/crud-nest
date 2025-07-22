import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

type Data = {
  token: string;
  message: string;
  success: boolean;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<Data> {
    const token = await this.authService.signUp(signUpDto);
    return {
      token: token.token,
      message: 'User created successfully',
      success: true,
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<Data> {
    const token = await this.authService.login(loginDto);
    return {
      token: token.token,
      message: 'User logged in successfully',
      success: true,
    };
  }
}
