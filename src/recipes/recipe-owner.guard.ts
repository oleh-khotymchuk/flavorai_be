import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';

interface AuthRequest extends Request {
  user: { id: string; role: string };
}

@Injectable()
export class RecipeOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const userId = request.user?.id;
    const recipeId = request.params?.id;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!recipeId) {
      throw new BadRequestException('Recipe ID is required');
    }

    if (request.user?.role === 'ADMIN') {
      return true;
    }

    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { userId: true },
    });

    if (!recipe) {
      throw new ForbiddenException('Recipe not found');
    }

    if (recipe.userId !== userId) {
      throw new ForbiddenException('You can only delete your own recipes');
    }

    return true;
  }
}
