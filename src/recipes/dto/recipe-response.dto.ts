export class RecipeResponseDto {
  id: string;
  title: string;
  description?: string | null;
  ingredients: string;
  instructions: string;
  imageUrl?: string | null;
  notes?: string | null;
  userId: string;
  user: {
    id: string;
    name?: string | null;
    email: string;
  };
  ratings: Array<{
    id: string;
    rating: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
