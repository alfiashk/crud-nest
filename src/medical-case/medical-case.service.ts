import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMedicalCaseDto } from './dto/create-medical-case.dto';
import { UpdateMedicalCaseDto } from './dto/update-medical-case.dto';
import { Model } from 'mongoose';
import {
  MedicalCase,
  MedicalCaseDocument,
} from './schemas/medical-case.schema';
import { InjectModel } from '@nestjs/mongoose';
import { idParamDto } from './dto/idParamDto';
import { UpdateStatusDto } from './dto/update-status-medical-case.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class MedicalCaseService {
  constructor(
    @InjectModel(MedicalCase.name)
    private medicalCaseModel: Model<MedicalCaseDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(
    createMedicalCaseDto: CreateMedicalCaseDto,
    id: string,
  ): Promise<MedicalCase> {
    try {
      const user = await this.userModel.findById(id).select('-password').exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user['role'] !== 'admin') {
        throw new UnauthorizedException('User is not an admin');
      }
      const newCase = new this.medicalCaseModel({
        title: createMedicalCaseDto.title,
        description: createMedicalCaseDto.description,
        userId: createMedicalCaseDto.userId,
      });
      return await newCase.save();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(id: string): Promise<MedicalCase[]> {
    const cases = await this.medicalCaseModel
      .find({ userId: id.toString() })
      .exec();
    if (!cases || cases.length === 0) {
      throw new NotFoundException('No medical cases found');
    }
    return cases;
  }

  async findOne(params: idParamDto, userId: string): Promise<MedicalCase> {
    const caseId = params.id;
    const medicalCase = await this.medicalCaseModel
      .findById({ _id: caseId, userId })
      .exec();
    if (!medicalCase) {
      throw new NotFoundException();
    }
    console.log('returning the medical case ');
    return medicalCase;
  }

  async update(params: idParamDto, updateMedicalCaseDto: UpdateMedicalCaseDto) {
    const caseId = params.id;
    const existingMedicalCase = await this.medicalCaseModel
      .findByIdAndUpdate(caseId, updateMedicalCaseDto, { new: true })
      .exec();

    if (!existingMedicalCase) {
      throw new NotFoundException(`Medical case with ID ${caseId} not found`);
    }
    return existingMedicalCase;
  }

  async updateStatus(
    params: idParamDto,
    updateStatusDto: UpdateStatusDto,
  ): Promise<MedicalCase> {
    const caseId = params.id;
    console.log('this is status: ', updateStatusDto.status);
    const existingMedicalCase = await this.medicalCaseModel
      .findByIdAndUpdate(caseId, updateStatusDto, { new: true })
      .exec();
    if (!existingMedicalCase) {
      throw new NotFoundException(`Medical case with ID ${caseId} not found`);
    }
    console.log(existingMedicalCase);
    return existingMedicalCase;
  }

  async remove(params: idParamDto): Promise<MedicalCase | null> {
    const caseId = params.id;
    const deleteCase = await this.medicalCaseModel.findByIdAndDelete(caseId);
    if (!deleteCase) {
      throw new NotFoundException(`Medical case with ID ${caseId} not found`);
    }
    return deleteCase;
  }
}
