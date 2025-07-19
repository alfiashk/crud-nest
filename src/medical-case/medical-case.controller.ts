import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { MedicalCaseService } from './medical-case.service';
import { CreateMedicalCaseDto } from './dto/create-medical-case.dto';
import { UpdateMedicalCaseDto } from './dto/update-medical-case.dto';
import { MedicalCase } from './schemas/medical-case.schema';
import { idParamDto } from './dto/idParamDto';
import { UpdateStatusDto } from './dto/update-status-medical-case.dto';
import { HeaderDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';

declare module 'express' {
  interface Request {
    user?: {
      userId: string;
      username: string;
    };
  }
}

@Controller('medical-case')
export class MedicalCaseController {
  //? injecting medicalCase services in the controller with readonly mode,
  //? because we don't want to reassign service  with another service

  constructor(private readonly medicalCaseService: MedicalCaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMedicalCaseDto: CreateMedicalCaseDto,
  ): Promise<MedicalCase> {
    const newCase = await this.medicalCaseService.create(createMedicalCaseDto);
    return newCase;
  }

  @Get()
  findAll(): Promise<MedicalCase[]> {
    return this.medicalCaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: idParamDto): Promise<MedicalCase> {
    console.log('param we got form the request', id);
    const medicalCase = await this.medicalCaseService.findOne(id);
    return medicalCase;
  }

  @Put(':id')
  async update(
    @Param() id: idParamDto,
    @Body() updateMedicalCaseDto: UpdateMedicalCaseDto,
  ) {
    const updatedCase = this.medicalCaseService.update(
      id,
      updateMedicalCaseDto,
    );
    return updatedCase;
  }

  @Patch(':id')
  async updateStatus(
    @Param() id: idParamDto,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const updatedCase = await this.medicalCaseService.updateStatus(
      id,
      updateStatusDto,
    );
    return updatedCase;
  }

  @Delete(':id')
  async remove(@Param() id: idParamDto) {
    return await this.medicalCaseService.remove(id);
  }

  @Patch('head/test')
  async header(
    @RequestHeader(
      new ValidationPipe({
        validateCustomDecorators: true,
      }),
    )
    header: HeaderDto,
  ) {
    return header['access-token'];
  }
}
