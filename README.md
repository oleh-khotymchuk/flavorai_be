# FlavorAI Backend

A NestJS-based REST API for the FlavorAI recipe management application. Built with TypeScript, Prisma ORM, and PostgreSQL.

## Overview

The FlavorAI backend provides a comprehensive API for:

- User authentication and authorization
- Recipe management (CRUD operations)
- Recipe search and filtering (by title, cuisine, ingredients)
- Rating system
- Role-based access control (User, Admin)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher) - https://nodejs.org/
- npm (comes with Node.js)
- PostgreSQL (v14 or higher) - https://www.postgresql.org/download/
- Git (optional, for cloning the repository)

## Local Installation

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup PostgreSQL Database

#### Using Command Line

```powershell
psql -U postgres
# Enter your PostgreSQL password when prompted

# Inside PostgreSQL console:
CREATE DATABASE flavorai_db;
\q
```

### Step 3: Configure Environment Variables

Create a .env file in the backend directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/flavorai_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
```

Important: Replace password with your actual PostgreSQL password.

### Step 4: Run Database Migrations

```bash
npm run prisma:migrate
```

This creates all necessary tables in the PostgreSQL database.

### Step 5: Start the Backend Server

```bash
npm run start:dev
```

The backend will start on http://localhost:3001

## API Endpoints

### Authentication

- POST /auth/register - Register a new user
- POST /auth/login - Login user
- POST /auth/refresh - Refresh JWT token

### Recipes

- GET /recipes - Get all recipes (supports filtering)
- GET /recipes/:id - Get recipe by ID
- POST /recipes - Create new recipe
- PATCH /recipes/:id - Update recipe
- DELETE /recipes/:id - Delete recipe

### Query Parameters for Search

```
GET /recipes?search=pasta&cuisine=italian&ingredients=tomato,basil
```
