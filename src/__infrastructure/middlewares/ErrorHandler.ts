import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../_core/adapters/ErrorResponse";
import Octopus from "../_core/adapters/Octopus";

const error = async (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ErrorResponse(err);
  new Octopus().withLogger().logger.error(err.message, error.toLog());
  res.status(error.statusCode || 500).send(error.toResponse());
  next();
};

export default error;
