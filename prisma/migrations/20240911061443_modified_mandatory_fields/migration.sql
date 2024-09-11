/*
  Warnings:

  - Made the column `device_type` on table `devices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `device_name` on table `devices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serial_no` on table `devices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_name` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_email` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_phone` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_team` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_status` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_employeeId_fkey";

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "device_type" SET NOT NULL,
ALTER COLUMN "device_name" SET NOT NULL,
ALTER COLUMN "serial_no" SET NOT NULL,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "employee_name" SET NOT NULL,
ALTER COLUMN "employee_email" SET NOT NULL,
ALTER COLUMN "employee_phone" SET NOT NULL,
ALTER COLUMN "employee_team" SET NOT NULL,
ALTER COLUMN "employee_status" SET NOT NULL,
ALTER COLUMN "employee_status" SET DEFAULT 'active';

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
