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

@Controller('medical-case')
export class MedicalCaseController {
  constructor(private readonly medicalCaseService: MedicalCaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createMedicalCaseDto: CreateMedicalCaseDto,
    @Req() req: Request,
  ): Promise<MedicalCase> {
    const newCase = await this.medicalCaseService.create(
      createMedicalCaseDto,
      req['user'].id,
    );
    return newCase;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: Request): Promise<MedicalCase[]> {
    return this.medicalCaseService.findAll(req['user'].id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param() caseId: idParamDto,
    @Req() req: Request,
  ): Promise<MedicalCase> {
    const userId = req['user'].id;
    const medicalCase = await this.medicalCaseService.findOne(caseId, userId);
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
  remove(@Param() id: idParamDto) {
    return this.medicalCaseService.remove(id);
  }
}
