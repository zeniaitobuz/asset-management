/*
  Warnings:

  - Added the required column `assignee` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at ` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_assignment_id` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_description` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial_no` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "assignee" TEXT NOT NULL,
ADD COLUMN     "created_at " TEXT NOT NULL,
ADD COLUMN     "deleted_at" TEXT NOT NULL,
ADD COLUMN     "device_assignment_id" TEXT NOT NULL,
ADD COLUMN     "device_description" TEXT NOT NULL,
ADD COLUMN     "serial_no" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "employee_email" TEXT NOT NULL,
    "employee_phone" TEXT NOT NULL,
    "employee_team" TEXT NOT NULL,
    "employee_status" TEXT NOT NULL,
    "created_at " TEXT NOT NULL,
    "deleted_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);
