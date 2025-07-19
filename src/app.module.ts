import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedicalCaseModule } from './medical-case/medical-case.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'URI'),
    UserModule,
    AuthModule,
    MedicalCaseModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
