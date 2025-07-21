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
import { MedicalCase } from 'src/medical-case/schemas/medical-case.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //admin view
  @Get('allUsers')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request): Promise<User[]> {
    return this.userService.findAll(req['user'].id);
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

  @Get("/activeCases")
  @UseGuards(AuthGuard('jwt'))
  async findCases(@Req() req: Request): Promise<MedicalCase[]> {
    return await this.userService.activeCases(req['user'].id);
  }

  @Get("/allCases")
  @UseGuards(AuthGuard('jwt'))
  async allCases(@Req() req: Request): Promise<MedicalCase[]> {
    return await this.userService.activeCases(req['user'].id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, updateUserDto);
  }

  @Delete('/deleteUser/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //admin delete all user
  @Delete('/deleteAll')
  @UseGuards(AuthGuard('jwt'))
  async deleteUsers(@Req() req: Request) {
    return this.userService.deleteAll(req['user'].id);
  }

  //admin deleteOne user
  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Req() req: Request ,@Param('id') id: string) {
    return this.userService.deleteOne(req['user'].id,id);
  }

  //admin delete all user
  @Delete('/deleteAll')
  @UseGuards(AuthGuard('jwt'))
  async delAllCases(@Req() req: Request) {
    return this.userService.deleteAllCases(req['user'].id);
  }

  //admin deleteOne user
  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOneCase(@Req() req: Request ,@Param('id') id: string) {
    return this.userService.deleteOneCase(req['user'].id,id);
  }  

}
