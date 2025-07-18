import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)
  private  userModel: mongoose.Model<User>,
) {}

  //find all user
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException("User not found!");
    }
    return users;
  }

  //find single user
  async findOne(id: string): Promise<User | null>{
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const userOne = await this.userModel.findById(id);
    if (!userOne) {
      throw new NotFoundException("User not found!");
    }
    return userOne;
  }

  //update user
  async editUser(id: string, updateUserDto :UpdateUserDto): Promise<User | null> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const  updateUser = await this.userModel.findByIdAndUpdate(id,
      { $set: updateUserDto },
      { new: true });
    if (!updateUser) {
    throw new NotFoundException('User not found');
  }

  return updateUser;
  }


  //delete user
  async deleteUser(id: string): Promise<User | null>{
    const user = await this.userModel.findByIdAndDelete(id);
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
     if (!user) {
      throw new NotFoundException("User not found!");
    }
    return user ;
  }
  
}
