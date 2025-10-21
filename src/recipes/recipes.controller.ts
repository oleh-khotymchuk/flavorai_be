import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecipeOwnerGuard } from './recipe-owner.guard';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeResponseDto } from './dto/recipe-response.dto';

interface AuthRequest extends Request {
  user: { id: string };
}

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() req: AuthRequest,
  ): Promise<RecipeResponseDto> {
    return this.recipesService.create({
      ...createRecipeDto,
      userId: req.user.id,
    });
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('cuisine') cuisine?: string,
    @Query('ingredients') ingredients?: string,
  ): Promise<RecipeResponseDto[]> {
    return this.recipesService.findAll(search, cuisine, ingredients);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMy(@Req() req: AuthRequest): Promise<RecipeResponseDto[]> {
    return this.recipesService.findByUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    return this.recipesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @UseGuards(JwtAuthGuard, RecipeOwnerGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rate')
  async rate(
    @Param('id') id: string,
    @Body() body: { rating: number },
    @Req() req: AuthRequest,
  ) {
    return this.recipesService.rate(id, req.user.id, body.rating);
  }
}
