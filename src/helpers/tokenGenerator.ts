import jwt from "jsonwebtoken";
import config from "../config/config";

export default function tokenGenerator(
  payload: { id: string },
  expiry?: string
) {
  console.log(config.JWT_EXPIRE, config.JWT_SECRET_REFRESH);
  return {
    accessToken: jwt.sign(payload, config.JWT_SECRET ?? "", {
      expiresIn: expiry || config.JWT_EXPIRE,
    }),
    refreshToken: jwt.sign(payload, config.JWT_SECRET_REFRESH ?? "", {
      expiresIn: expiry || config.JWT_EXPIRE_REFRESH,
    }),
  };
}
