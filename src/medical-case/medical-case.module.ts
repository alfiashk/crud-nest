import { Module, ValidationPipe } from '@nestjs/common';
import { MedicalCaseService } from './medical-case.service';
import { MedicalCaseController } from './medical-case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalCase, MedicalCaseSchema } from './schemas/medical-case.schema';
import { APP_PIPE } from '@nestjs/core';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  controllers: [MedicalCaseController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        always: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    MedicalCaseService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: MedicalCase.name, schema: MedicalCaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class MedicalCaseModule {}
