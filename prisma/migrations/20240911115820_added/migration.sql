/*
  Warnings:

  - Added the required column `employee_password` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "is_outdated" BOOLEAN;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employee_password" TEXT NOT NULL,
ADD COLUMN     "employee_type" TEXT DEFAULT 'employee';

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "current_user" TEXT NOT NULL,
    "previous_users" TEXT[],

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_current_user_fkey" FOREIGN KEY ("current_user") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
