import LoggerInUse from "./inUse/LoggerInUse";
import ServerInUse from "./inUse/ServerInUse";
import * as UUIDGeneratorInUse from "./inUse/UUIDGeneratorInUse";
interface OctopusInterface {
  logger: LoggerInUse;
  server: ServerInUse;
  uuid: typeof UUIDGeneratorInUse;
}
export default class Octopus implements OctopusInterface {
  public logger: LoggerInUse;
  public server: ServerInUse;
  public uuid: typeof UUIDGeneratorInUse;
  withServer() {
    this.server = new ServerInUse();
    return this;
  }
  withLogger() {
    this.logger = new LoggerInUse();
    return this;
  }
  withUUIDGenerator() {
    this.uuid = UUIDGeneratorInUse;
    return this;
  }
}
