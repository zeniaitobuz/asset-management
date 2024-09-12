import "dotenv/config";

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_EXPIRE_REFRESH: process.env.JWT_REFRESH_EXPIRE,
};
