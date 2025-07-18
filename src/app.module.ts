import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicalCaseModule } from './medical-case/medical-case.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'URI'),
    MedicalCaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
