import {
  Put,
  Get,
  Req,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  UseFilters,
  Controller,
} from '@nestjs/common';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MedicalCase } from 'src/medical-case/schemas/medical-case.schema';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/allUsers')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async findMe(@Req() req: Request) {
    return await this.userService.findMe(req['user'].id);
  }

  @Get('/activeCases')
  @UseGuards(AuthGuard('jwt'))
  async findCases(@Req() req: Request): Promise<MedicalCase[]> {
    return await this.userService.activeCases(req['user'].id);
  }

  @Get('/allCases')
  @UseGuards(AuthGuard('jwt'))
  async allCases(@Request() req: Request): Promise<MedicalCase[]> {
    return await this.userService.activeCases(req['user'].id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
