require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME || "My App",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  API_URL: process.env.API_URL,
  // database
  DB_HOST: process.env.PGHOST,
  DB_USER: process.env.PGUSER,
  DB_PASSWORD: process.env.PGPASSWORD,
  DB_NAME: process.env.PGDATABASE,
  DB_PORT: process.env.PGPORT,
  // jwt
  JWT_SECRET: process.env.JWT_SECRET,
};
