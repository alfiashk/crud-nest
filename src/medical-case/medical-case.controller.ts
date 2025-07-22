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
  Req,
  UseGuards,
} from '@nestjs/common';
import { MedicalCaseService } from './medical-case.service';
import { CreateMedicalCaseDto } from './dto/create-medical-case.dto';
import { UpdateMedicalCaseDto } from './dto/update-medical-case.dto';
import { MedicalCase } from './schemas/medical-case.schema';
import { idParamDto } from './dto/idParamDto';
import { UpdateStatusDto } from './dto/update-status-medical-case.dto';
import { AuthGuard } from '@nestjs/passport';

declare module 'express' {
  interface Request {
    user?: {
      userId: string;
      username: string;
    };
  }
}

type Data = {
  data: MedicalCase[] | MedicalCase;
  message: string;
  success: boolean;
};

@UseGuards(AuthGuard('jwt'))
@Controller('medical-case')
export class MedicalCaseController {
  constructor(private readonly medicalCaseService: MedicalCaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMedicalCaseDto: CreateMedicalCaseDto,
    @Req() req: Request,
  ): Promise<Data> {
    const newCase = await this.medicalCaseService.create(
      createMedicalCaseDto,
      req['user'].id,
    );
    return {
      data: newCase,
      message: 'Medical case created successfully',
      success: true,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: Request): Promise<Data> {
    const cases = await this.medicalCaseService.findAll(req['user'].id);
    return {
      data: cases,
      message: 'Medical cases fetched successfully',
      success: true,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param() caseId: idParamDto,
    @Req() req: Request,
  ): Promise<Data> {
    const userId = req['user'].id;
    const medicalCase = await this.medicalCaseService.findOne(caseId, userId);
    return {
      data: medicalCase,
      message: 'Medical case fetched successfully',
      success: true,
    };
  }

  @Put(':id')
  async update(
    @Param() id: idParamDto,
    @Body() updateMedicalCaseDto: UpdateMedicalCaseDto,
  ): Promise<Data> {
    const updatedCase = await this.medicalCaseService.update(
      id,
      updateMedicalCaseDto,
    );
    return {
      data: updatedCase,
      message: 'Medical case updated successfully',
      success: true,
    };
  }

  @Patch(':id')
  async updateStatus(
    @Param() id: idParamDto,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Data> {
    const updatedCase = await this.medicalCaseService.updateStatus(
      id,
      updateStatusDto,
    );
    return {
      data: updatedCase,
      message: 'Medical case status updated successfully',
      success: true,
    };
  }

  @Delete(':id')
  remove(@Param() id: idParamDto) {
    return this.medicalCaseService.remove(id);
  }
}
