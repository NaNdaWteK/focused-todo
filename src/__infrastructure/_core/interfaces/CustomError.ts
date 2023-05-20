export default class CustomError extends Error {
  public message: string;
  public statusCode: number;
  public isOwn: boolean;
  public data: Record<string, unknown>;
  constructor(
    message: string,
    statusCode: number,
    data: Record<string, unknown>
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isOwn = true;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
