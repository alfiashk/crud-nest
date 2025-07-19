import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class MedicalCaseService {
  constructor(
    @InjectModel(MedicalCase.name)
    private medicalCaseModel: Model<MedicalCaseDocument>,
  ) {}

  async create(
    createMedicalCaseDto: CreateMedicalCaseDto,
  ): Promise<MedicalCase> {
    try {
      console.log('hello im here in create');
      const newCase = new this.medicalCaseModel({
        title: createMedicalCaseDto.title,
        description: createMedicalCaseDto.description,
        userId: createMedicalCaseDto.userId,
      });
      return await newCase.save();
    } catch (error) {
      console.log('there is some error ');
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<MedicalCase[]> {
    const cases = await this.medicalCaseModel.find().exec();
    if (!cases || cases.length === 0) {
      throw new NotFoundException('No medical cases found');
    }
    return cases;
  }

  async findOne(id: idParamDto): Promise<MedicalCase> {
    const caseId = id.id;
    const medicalCase = await this.medicalCaseModel
      .findById({ _id: caseId })
      .exec();
    if (!medicalCase) {
      throw new NotFoundException();
    }
    console.log('returning the medical case ');
    return medicalCase;
  }

  async update(id: idParamDto, updateMedicalCaseDto: UpdateMedicalCaseDto) {
    const caseId = id.id;
    const existingMedicalCase = await this.medicalCaseModel
      .findByIdAndUpdate(caseId, updateMedicalCaseDto, { new: true })
      .exec();

    if (!existingMedicalCase) {
      throw new NotFoundException(`Medical case with ID ${caseId} not found`);
    }
    return existingMedicalCase;
  }

  async updateStatus(id: idParamDto, updateStatusDto: UpdateStatusDto) {
    const caseId = id.id;
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

  async remove(id: idParamDto): Promise<MedicalCase> {
    const deleteCase = await this.medicalCaseModel.findByIdAndDelete(id.id);
    if (!deleteCase) {
      throw new NotFoundException(`Medical case with ID ${id.id} not found`);
    }
    return deleteCase;
  }
}
