export interface ApiError {
  statusCode: number;
  toLog(): void;
  toResponse(): void;
}
export default ApiError;
