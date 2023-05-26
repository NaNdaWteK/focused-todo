import * as dotenv from "dotenv";
dotenv.config();

function die(what: Error | string): never {
  if (typeof what === "string") {
    throw new Error(what);
  }
  throw what;
}

const config = {
  environment:
    process.env.NODE_ENV ??
    die("Environment variable \"NODE_ENV\" wasn't defined!"),
  port:
    process.env.RESTAPI_PORT ??
    die("Environment variable \"RESTAPI_PORT\" wasn't defined!"),
  version:
    process.env.RESTAPI_VERSION ??
    die("Environment variable \"RESTAPI_VERSION\" wasn't defined!"),
  accessSecretToken:
    process.env.ACCESS_TOKEN_SECRET ??
    die("Environment variable \"ACCESS_TOKEN_SECRET\" wasn't defined!"),
  saltSecret:
    process.env.SALT_SECRET ??
    die("Environment variable \"SALT_SECRET\" wasn't defined!"),
  tokenExpirationMilliseconds:
    process.env.TOKEN_EXPIRATION_MILLISECONDS ??
    die(
      "Environment variable \"TOKEN_EXPIRATION_MILLISECONDS\" wasn't defined!"
    ),
  databaseHost:
    process.env.DATABASE_HOST ??
    die("Environment variable \"DATABASE_HOST\" wasn't defined!"),
  databasePort:
    process.env.DATABASE_PORT ??
    die("Environment variable \"DATABASE_PORT\" wasn't defined!"),
  databaseName:
    process.env.DATABASE_NAME ??
    die("Environment variable \"DATABASE_NAME\" wasn't defined!"),
  databaseUser:
    process.env.DATABASE_USER ??
    die("Environment variable \"DATABASE_USER\" wasn't defined!"),
  databasePassword:
    process.env.DATABASE_PASSWORD ??
    die("Environment variable \"DATABASE_PASSWORD\" wasn't defined!"),
  logsLevel:
    process.env.LOGS_LEVEL ??
    die("Environment variable \"LOGS_LEVEL\" wasn't defined!"),
  daysToDeleteLogFiles:
    process.env.LOG_FILES_EXPIRATION_DAYS ??
    die("Environment variable \"LOG_FILES_EXPIRATION_DAYS\" wasn't defined!"),
};
export default config;
