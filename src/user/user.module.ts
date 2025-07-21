import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MedicalCaseModule } from 'src/medical-case/medical-case.module';
import { MedicalCase, MedicalCaseSchema } from 'src/medical-case/schemas/medical-case.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
     { name: MedicalCase.name, schema: MedicalCaseSchema },
      {name:'User', schema: UserSchema}
    ]),
    MedicalCaseModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
