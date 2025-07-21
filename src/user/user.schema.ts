import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MedicalCase } from "../medical-case/schemas/medical-case.schema";
import mongoose from "mongoose";

export enum userRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    userName: string;

    @Prop({ enum: userRole, default: userRole.USER })
    role?: userRole;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
