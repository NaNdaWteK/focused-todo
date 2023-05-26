import config from "../../config/default";
import TodoRepository from "../../repositories/TodoRepository";
import UserRepository from "../../repositories/UserRepository";
import LoggerInUse from "./inUse/LoggerInUse";
import ServerInUse from "./inUse/ServerInUse";
import * as UUIDGeneratorInUse from "./inUse/UUIDGeneratorInUse";

interface OctopusInterface {
  logger: LoggerInUse;
  server: ServerInUse;
  uuid: typeof UUIDGeneratorInUse;
  config: typeof config;
}
export default class Octopus implements OctopusInterface {
  public todoRepo: TodoRepository;
  public userRepo: UserRepository;
  public logger: LoggerInUse;
  public server: ServerInUse;
  public uuid: typeof UUIDGeneratorInUse;
  public config: typeof config;
  withTodoRepository() {
    this.todoRepo = new TodoRepository();
    return this;
  }
  withUserRepository() {
    this.userRepo = new UserRepository();
    return this;
  }
  withConfig() {
    this.config = config;
    return this;
  }
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
