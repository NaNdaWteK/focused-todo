import logger, { Logger } from "pino";
import pino from "pino";
import pkg from "../../../../package.json";
import config from "../../config/default";
import LoggerInterface from "../interfaces/LoggerInterface";

export default class PinoLogger implements LoggerInterface {
  private logger: Logger;
  static appName = {
    appName: pkg.name,
  };
  constructor() {
    this.logger = logger(
      {
        level: config.logsLevel || "info",
        mixin() {
          return PinoLogger.appName;
        },
      },
      pino.multistream([
        { stream: process.stdout },
        {
          stream: pino.destination(
            `${process.cwd()}/logs/${config.environment}.${this.getDate()}.log`
          ),
        },
      ])
    );
  }
  info(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    child.info(message, data);
  }

  error(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    child.error(message, data);
  }

  warn(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    child.warn(message, data);
  }
  private getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
}
