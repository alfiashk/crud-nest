import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicalCaseDocument = MedicalCase & Document;

export enum medicalCaseStatus {
  DONE = 'done',
  IN_PROGRESS = 'in-progress',
}

@Schema({ timestamps: true })
export class MedicalCase {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ enum: medicalCaseStatus, default: medicalCaseStatus.IN_PROGRESS })
  status: string;
}

export const MedicalCaseSchema = SchemaFactory.createForClass(MedicalCase);
