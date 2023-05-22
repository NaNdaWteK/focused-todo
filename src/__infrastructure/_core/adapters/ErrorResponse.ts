import { Status } from "../../../__share/interfaces/Status";
import { ApiError } from "../interfaces/ApiError";
import CustomError from "../interfaces/CustomError";
import * as uuid from "./inUse/UUIDGeneratorInUse";

export default class ErrorResponse implements ApiError {
  private errorId: string;
  private message: string;
  public statusCode: number;
  private isOwn: boolean;
  private data: unknown;
  private type: string;
  private status: string;
  private stack: string | undefined;
  private createdAt: string;

  constructor(
    error: Error | CustomError,
    serviceStatusCode = Status.SERVER_ERROR
  ) {
    this.errorId = uuid.generateUUID();
    this.message = error.message;
    if (error instanceof CustomError) {
      this.statusCode = error.statusCode ? error.statusCode : serviceStatusCode;
      this.isOwn = error.isOwn || false;
      this.data = error.data || {};
    }
    this.type = Object.getPrototypeOf(error).constructor.name;
    this.status = "ko";
    this.stack = error.stack;
    this.createdAt = new Date().toISOString();
  }

  toLog() {
    return JSON.parse(
      JSON.stringify({
        errorId: this.errorId,
        message: this.message,
        statusCode: this.statusCode,
        isOwn: this.isOwn,
        data: this.data,
        type: this.type,
        status: this.status,
        stack: this.stack,
        createdAt: this.createdAt,
      })
    );
  }

  toResponse() {
    return {
      id: this.errorId,
      message: this.message,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
