import { AccessController } from "orbit-db-access-controllers";
import { verify } from "./verify";

export class NEARAccessController extends AccessController {
  static async create(orbitdb, options) {
    return new NEARAccessController();
  }

  static get type() {
    return "NEARAccessController";
  }

  async canAppend({ identity }) {
    return verify(identity);
  }

  async save() {
    return {};
  }
}
