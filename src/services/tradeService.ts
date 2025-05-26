import { logTx } from './logTx';

export class TradeService {
  constructor(
    private suiRpcUrl: string,
    private feeCollectorAddress: string
  ) {}

  async executeTrade(params: {
    amount: number;
    tokenAddress: string;
    userWallet: string;
  }): Promise<{ txId: string }> {
    const { amount, tokenAddress, userWallet } = params;
    const fee = amount * 0.003;
    const tradeAmount = amount - fee;

    // 🔧 Replace this mock with actual Sui SDK trade logic
    const fakeTxId = '0x' + Math.floor(Math.random() * 1e16).toString(16);

    // Log transaction to file
    await logTx({
      txId: fakeTxId,
      token: tokenAddress,
      amount,
      fee,
      wallet: userWallet
    });

    return { txId: fakeTxId };
  }
}
