import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { userName, password, role } = signUpDto;

    const exists = await this.userModel.findOne({ userName });
    if (exists) {
      throw new ConflictException('Username already exists');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      userName,
      password: hashedPass,
      role,
    });

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1d' });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { userName, password } = loginDto;
    const user = await this.userModel.findOne({ userName });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPassMatched = await bcrypt.compare(password, user.password);
    if (!isPassMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role,
      },
      { expiresIn: '1d' },
    );

    return { token };
  }
}
