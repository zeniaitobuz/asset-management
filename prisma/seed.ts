import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function dataSeed() {
  for (let index = 0; index < 5; index++) {
    await prisma.employees.create({
      data: {
        employeeName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        employeeEmail: faker.internet.email(),
        employeePhone: "+918765432190",
        employeeTeam: "QA",
      },
    });

    await prisma.devices.create({
      data: {
        deviceName: "MacBook Air",
        deviceType: "MacBook",
        serialNo: `${Math.floor(Math.random() * 100000000)}`,
      },
    });
  }
}
dataSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
