-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "cuisine" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
