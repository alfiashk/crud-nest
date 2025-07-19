import { IsString, IsNotEmpty, Length, IsMongoId } from 'class-validator';
export class CreateMedicalCaseDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @Length(4, 16)
  title: string;

  @IsString()
  @Length(2, 100)
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
