/*
  Warnings:

  - The `employee_type` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('Admin', 'Employee');

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employee_type",
ADD COLUMN     "employee_type" "EmployeeType" DEFAULT 'Employee';
