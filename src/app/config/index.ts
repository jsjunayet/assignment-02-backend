import detenv from 'dotenv';
detenv.config();

export const config = {
  Mongodb_url: process.env.MONGO_DB_URL,
  port: process.env.PORT,
};
