-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "history" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
