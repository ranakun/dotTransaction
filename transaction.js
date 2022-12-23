const { methods } = require("@substrate/txwrapper-polkadot");
const { getTxHash } = require("@substrate/txwrapper-polkadot");
const { createSignedTx } = require("@substrate/txwrapper-polkadot");
const { createSigningPayload } = require("@substrate/txwrapper-polkadot");

async function createAndSendTx(
    from, 
    to, 
    value,
    blockHash,
    blockNumber,
    genesisHash,
    metadataRpc,
    nonce,
    specVersion,
    tip,
    eraPeriod,
    transactionVersion,
    metadataRpc,
    registry,
) 
{
    try {
        const unsigned = methods.balances.transferKeepAlive(
        {
          dest: to,
          value: value,
        },
        {
          address: from,
          blockHash: blockHash,
          blockNumber: blockNumber,
          genesisHash: genesisHash,
          metadataRpc, // must import from client RPC call state_getMetadata
          nonce: nonce,
          specVersion: specVersion,
          tip: tip,
          eraPeriod: eraPeriod, // number of blocks from checkpoint that transaction is valid
          transactionVersion: transactionVersion,
        },
        {
          metadataRpc,
          registry, // Type registry
        }
      );
      const signingPayload = createSigningPayload(unsigned, { registry });
      const signature = await signWithAlice(signingPayload);
      const signedTx = createSignedTx(unsigned, signature, { metadataRpc, registry })
      const txHash = getTxHash(signedTx);
      console.log("Transaction Hash: ",txHash);
    } catch (err) {
        console.log(err);
    }
  }

  createAndSendTx("15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y",
  "121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2",5000000000,
  "0x1fc7493f3c1e9ac758a183839906475f8363aafb1b1d3e910fe16fab4ae1b582",
  4302222,"0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
  2,1019,0,64,1,
  )
