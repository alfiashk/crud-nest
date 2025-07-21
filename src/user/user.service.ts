import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { MedicalCase, MedicalCaseDocument } from 'src/medical-case/schemas/medical-case.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(MedicalCase.name)
    private medicalCaseModel: Model<MedicalCaseDocument>,
  ) {}

  //find all user
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('User not found!');
    }
    return users;
  }

  //find single user
  async findOne(id: string): Promise<User | null> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const userOne = await this.userModel.findById(id);
    if (!userOne) {
      throw new NotFoundException('User not found!');
    }
    return userOne;
  }

  //find me
  async findMe(id: any): Promise<User | null> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const userOne = await this.userModel.findById(id).select('-password');
    if (!userOne) {
      throw new NotFoundException('User not found!');
    }
    return userOne;
  }


  //find my active medical cases
  async activeCases(id: ObjectId): Promise<MedicalCase[]> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const medicalCases = await this.medicalCaseModel.find({userId: String(id), status:"in-progress"}).exec();
    if (!medicalCases) {
      throw new NotFoundException('Medical Case not found!');
    }
    return medicalCases;
  }

  //find my medical cases
  async allCases(id: ObjectId): Promise<MedicalCase[]> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const medicalCases = await this.medicalCaseModel.find({userId: String(id)}).exec();
    if (!medicalCases) {
      throw new NotFoundException('Medical Case not found!');
    }
    return medicalCases;
  }

  //update user
  async editUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .select('-password')
      .exec();
    if (!updateUser) {
      throw new NotFoundException('User not found');
    }

    return updateUser;
  }

  //delete user
  async deleteUser(id: string): Promise<User | null> {
    const user = await this.userModel
      .findByIdAndDelete(id)
      .select('-password')
      .exec();
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
}
