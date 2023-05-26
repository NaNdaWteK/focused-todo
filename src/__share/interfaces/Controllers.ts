import Octopus from "../../__infrastructure/_core/adapters/Octopus";

export interface Controllers {
  routes(server: Octopus["server"]): Promise<void>;
}
