import { NextFunction, Request, Response } from "express";
import logger from "../_core/adapters/inUse/LoggerInUse";

const logInfo = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`(${req.method}) => ${req.headers.host}${req.path}`);
  next();
};

export default logInfo;
