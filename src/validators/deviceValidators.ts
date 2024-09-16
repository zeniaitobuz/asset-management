import { z } from "zod";
import { regex } from "../constants/regEx";

export const deviceValidator = z.object({
  deviceType: z.string({
    required_error: "Device type is required!",
    invalid_type_error: "Device Type will be in a string format!",
  }),
  deviceName: z.string({
    required_error: "Device name is required!",
    invalid_type_error: "Device Name will be in a string format!",
  }),
  serialNo: z.string({
    required_error: "Serial number is required!",
    invalid_type_error: "Serial Number will be in a string format!",
  }),
  assignee: z
    .string({
      invalid_type_error: "Assignee will be in a string format!",
    })
    .email()
    .refine((value) => regex.emailFormat.test(value), {
      message: "Invalid email format!",
    }),
});
