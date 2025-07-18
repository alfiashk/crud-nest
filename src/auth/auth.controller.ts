import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private  authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signUpDto: SignUpDto): Promise<{ token: string}> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string}> {
    return this.authService.login(loginDto);
  }

  
}
