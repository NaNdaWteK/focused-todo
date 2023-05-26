import { RequestHandler } from "express";

export interface HttpServer {
  addRoute(method: HttpMethod, path: string, handler: RequestHandler): void;
  addAuthenticatedRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler
  ): void;
  add(handlers: (...handlers: unknown[]) => void): void;
  start(port: number): void;
  stop(): void;
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}
