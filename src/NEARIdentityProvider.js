import IdentityProvider from "orbit-db-identity-provider";
import { encode } from "bs58";
import { verify } from "./verify";

export class NEARIdentityProvider extends IdentityProvider {
  constructor(options) {
    super(options);
    this.near = options.near;
    this.wallet = options.wallet;
  }
  async getId() {
    return this.wallet.getAccountId();
  }

  async signIdentity(data) {
    const keyPair = await this.near.config.keyStore.getKey(
      this.near.config.networkId,
      this.wallet.getAccountId()
    );
    const { publicKey, signature } = keyPair.sign(Buffer.from(data));

    return `${publicKey.toString()}..${encode(signature)}..${
      this.near.config.nodeUrl
    }`;
  }

  static async verifyIdentity(identity) {
    return verify(identity);
  }

  static get type() {
    return "NEARIdentityProvider";
  }
}
