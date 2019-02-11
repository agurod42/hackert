import { AssetLedger, AssetLedgerDeployRecipe } from '@0xcert/ethereum-asset-ledger';
import { MetamaskProvider } from '@0xcert/ethereum-metamask-provider';

class _0xcertSingleton {

    public provider: MetamaskProvider;

    constructor() {
        this.provider = new MetamaskProvider();
    }

    async enable() {
        if (!await this.provider.isEnabled()) {
            await this.provider.enable();
        }
    }

    async deployLedger(ledger: AssetLedgerDeployRecipe) {
        const mutation = await AssetLedger.deploy(this.provider, ledger).then((mutation) => mutation.complete());
        return mutation.receiverId;
    }

    async getLedger(id: string): Promise<AssetLedger> {
        return await AssetLedger.getInstance(this.provider, id);
    }

}

export default new _0xcertSingleton();