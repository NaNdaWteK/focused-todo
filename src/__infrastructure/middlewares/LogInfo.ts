import { NextFunction, Request, Response } from "express";
import Octopus from "../_core/adapters/Octopus";

const logInfo = (req: Request, res: Response, next: NextFunction) => {
  new Octopus()
    .withLogger()
    .logger.info(`(${req.method}) => ${req.headers.host}${req.path}`);
  next();
};

export default logInfo;
