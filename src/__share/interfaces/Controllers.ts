import ExpressServer from "../../__infrastructure/_core/adapters/ExpressServer";

export interface Controllers {
  routes(server: ExpressServer): Promise<void>;
}
