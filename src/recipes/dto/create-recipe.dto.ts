import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Title must not be empty' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Ingredients must not be empty' })
  ingredients: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Instructions must not be empty' })
  instructions: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  cuisine?: string;
}
