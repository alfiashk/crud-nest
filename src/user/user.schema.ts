import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";

export enum userRole{
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({ timestamps: true})
export class User{
    @Prop({ required: true , unique: true})
    userName: string;

    @Prop({ enum: userRole, default: userRole.USER })
    role?: userRole;

    //medical cases ref
    // @Prop({ type: mongoose.Schema.ObjectId, ref: 'Cases' })
    // cases: Cases;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

