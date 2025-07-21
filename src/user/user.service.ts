import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  //Admin -find all user
  async findAll(id: ObjectId): Promise<User[]> {
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    throw new BadRequestException('Please enter a valid ID');
  }
  const user = await this.userModel.findById(id).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }
  if (user.role !== 'admin') {
    throw new UnauthorizedException('User is not an admin');
  }
  const users = await this.userModel.find().select('-password').exec();
  return users;
}
  //Admin -Delete Single user
  async deleteOne(reqUser: ObjectId,id: string): Promise<User | null> {
    const isValidId = mongoose.isValidObjectId(reqUser);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID');
    }
    const user = await this.userModel.findById(reqUser).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not an admin');
    }
      const delUser = await this.userModel
        .findByIdAndDelete(id)
        .select('-password')
        .exec();
    
    return delUser;
  }

  //Admin -Delete All Users
  async deleteAll(reqUser: ObjectId): Promise<User[] | null> {
     const isValidId = mongoose.isValidObjectId(reqUser);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID');
    }
    const user = await this.userModel.findById(reqUser).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not an admin');
    }
    
    const users = await this.userModel
      .find({role: "user"})
      .select('-password')
      .exec();
    if (!users) {
      throw new NotFoundException('Users not found!');
    }
    return users;
  }


  //Admin -Delete one case
  async deleteOneCase(reqUser: ObjectId, id: string): Promise<MedicalCase | null> {
     const isValidId = mongoose.isValidObjectId(reqUser);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID');
    }
    const user = await this.userModel.findById(reqUser).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not an admin');
    }
    const cases = await this.medicalCaseModel
      .findById(id)
      .exec();
    if (!cases) {
      throw new NotFoundException('Medical Cases not found!');
    }
    return cases;
  }


  //Admin -Delete all cases
  async deleteAllCases(reqUser: ObjectId): Promise<MedicalCase[] | null> {
     const isValidId = mongoose.isValidObjectId(reqUser);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID');
    }
    const user = await this.userModel.findById(reqUser).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not an admin');
    }
    
    const cases = await this.medicalCaseModel
      .find()
      .exec();
    if (!cases) {
      throw new NotFoundException('Medical Cases not found!');
    }
    return cases;
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
  async findMe(id: ObjectId): Promise<User | null> {
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
