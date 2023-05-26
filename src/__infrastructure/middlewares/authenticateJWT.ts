import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config/default";
import { Status } from "../../__share/interfaces/Status";
import { NextFunction, Request, Response } from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user = verify(token, config.accessSecretToken) as JwtPayload;
    if (!user) {
      throw new Error("Forbidden access");
    }
    req.user = user;
    next();
  } else {
    res.sendStatus(Status.UNAUTHORIZED);
  }
};

export default authenticateJWT;
