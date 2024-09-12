import bcryptjs from "bcryptjs";

const hashedPassword = await bcryptjs.hash("Itobuz#1234", 10);

console.log(`---${hashedPassword}---`, "---HELLO");
