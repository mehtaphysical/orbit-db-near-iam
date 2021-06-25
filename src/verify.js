import { sign } from "tweetnacl";
import { JsonRpcProvider } from "near-api-js/lib/providers";
import { decode } from "bs58";

export const verify = async (identity) => {
  const [publicKey, signature, nodeUrl] =
    identity.signatures.publicKey.split("..");
  if (!nodeUrl) return false;

  const provider = new JsonRpcProvider(nodeUrl);

  try {
    const good = sign.detached.verify(
      Buffer.from(`${identity.publicKey}${identity.signatures.id}`),
      decode(signature),
      decode(publicKey.split(":")[1])
    );
    if (!good) return false;

    await provider.query({
      request_type: "view_access_key",
      account_id: identity.id,
      public_key: publicKey,
      finality: "optimistic",
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
