import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../_core/adapters/ErrorResponse";
import logger from "../_core/adapters/inUse/LoggerInUse";

const error = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ErrorResponse(err);
  logger.error(err.message, error.toLog());
  res.status(error.statusCode || 500).send(error.toResponse());
  next();
};

export default error;
