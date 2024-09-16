/*
  Warnings:

  - The `employee_status` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `device_type` on the `devices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "Devices" AS ENUM ('Phone', 'Watch', 'IMac', 'MacMini', 'MacBook');

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "device_type",
ADD COLUMN     "device_type" "Devices" NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employee_status",
ADD COLUMN     "employee_status" "EmployeeStatus" NOT NULL DEFAULT 'Active';
