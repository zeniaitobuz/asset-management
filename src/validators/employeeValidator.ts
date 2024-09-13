import { z } from "zod";
import { regex } from "../constants/regEx";
import { isValidPhoneNumber } from "libphonenumber-js";

export const employeeValidator = z.object({
  employeeName: z.string({ required_error: "Name is required!" }),
  employeeTeam: z.string({ required_error: "Team is required!" }),
  employeeEmail: z
    .string({
      required_error: "Email is required!",
    })
    .email()
    .refine((value) => regex.emailFormat.test(value), {
      message: "Invalid email format!",
    }),
  employeePhone: z
    .string({
      required_error: "Phone is required!",
    })
    .refine(
      (value) => {
        if (!isValidPhoneNumber(value, "IN")) {
          return false;
        }
        if (value.startsWith("+") && !value.startsWith("+91")) {
          return false;
        }
        return true;
      },
      { message: "Please provide a valid phone number" }
    ),
});
