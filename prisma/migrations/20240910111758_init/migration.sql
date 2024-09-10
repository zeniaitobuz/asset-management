-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "device_type" DROP NOT NULL,
ALTER COLUMN "device_name" DROP NOT NULL,
ALTER COLUMN "assignee" DROP NOT NULL,
ALTER COLUMN "created_at " DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "device_assignment_id" DROP NOT NULL,
ALTER COLUMN "device_description" DROP NOT NULL,
ALTER COLUMN "serial_no" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "employee_name" DROP NOT NULL,
ALTER COLUMN "employee_email" DROP NOT NULL,
ALTER COLUMN "employee_phone" DROP NOT NULL,
ALTER COLUMN "employee_team" DROP NOT NULL,
ALTER COLUMN "employee_status" DROP NOT NULL,
ALTER COLUMN "created_at " DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
