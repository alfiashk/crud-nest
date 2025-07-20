import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('allUsers')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string) {
  //   return await this.userService.findOne(id);
  // }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async findMe(@Req() req: Request) {
    return await this.userService.findMe(req['user'].id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
