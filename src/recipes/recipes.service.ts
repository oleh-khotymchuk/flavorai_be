import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecipeDto & { userId: string }) {
    return this.prisma.recipe.create({
      data,
      include: {
        user: true,
        ratings: true,
      },
    });
  }

  async findAll(search?: string, cuisine?: string, ingredients?: string) {
    interface WhereCondition {
      OR?: Array<{ [key: string]: { contains: string; mode: 'insensitive' } }>;
      cuisine?: { contains: string; mode: 'insensitive' };
      ingredients?: { contains: string; mode: 'insensitive' };
    }

    const where: WhereCondition = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { ingredients: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (cuisine && cuisine.trim()) {
      where.cuisine = { contains: cuisine, mode: 'insensitive' };
    }

    if (ingredients && ingredients.trim()) {
      where.ingredients = { contains: ingredients, mode: 'insensitive' };
    }

    return this.prisma.recipe.findMany({
      where: where as never,
      include: {
        user: { select: { id: true, name: true, email: true } },
        ratings: true,
      },
    });
  }

  async findOne(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        ratings: true,
      },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async findByUser(userId: string) {
    return this.prisma.recipe.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        ratings: true,
      },
    });
  }

  async update(id: string, data: UpdateRecipeDto) {
    return this.prisma.recipe.update({
      where: { id },
      data,
      include: {
        user: true,
        ratings: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }

  async rate(recipeId: string, userId: string, rating: number) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    return this.prisma.rating.upsert({
      where: {
        recipeId_userId: {
          recipeId,
          userId,
        },
      },
      update: { rating },
      create: { recipeId, userId, rating },
    });
  }
}
