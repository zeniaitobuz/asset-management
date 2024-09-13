import { z } from "zod";
import { regex } from "../constants/regEx";

export const deviceValidator = z.object({
  deviceType: z.string({ required_error: "Device type is required!" }),
  deviceName: z.string({ required_error: "Device name is required!" }),
  deviceDescription: z.string({
    required_error: "Device description is required!",
  }),
  serialNo: z.string({ required_error: "Serial number is required!" }),
  assignee: z
    .string()
    .email()
    .refine((value) => regex.emailFormat.test(value), {
      message: "Invalid email format!",
    }),
});
