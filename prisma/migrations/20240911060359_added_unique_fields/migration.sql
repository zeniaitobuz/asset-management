/*
  Warnings:

  - A unique constraint covering the columns `[serial_no]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employee_email]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "devices_serial_no_key" ON "devices"("serial_no");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_email_key" ON "employees"("employee_email");
