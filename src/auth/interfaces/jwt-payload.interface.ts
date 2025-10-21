export interface JwtPayload {
  email: string;
  sub: string;
}

export interface AuthenticatedRequest {
  user: {
    id: string;
    email: string;
  };
}
