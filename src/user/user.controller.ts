import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
