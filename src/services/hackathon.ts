import { AssetLedger, AssetLedgerCapability } from '@0xcert/ethereum-asset-ledger';
import { Cert } from '@0xcert/cert';
import { Object86, schema86 } from '@0xcert/conventions';
import _0xcert from './0xcert';
import firebase from './firebase';

export default class {

    async create(hackathon) {
        await _0xcert.enable();

        const ledger = {
            name: `${hackathon.title} Prize Certificate`,
            symbol: hackathon.symbol,
            uriBase: 'https://0xcert.org/assets/',
            schemaId: '0x3f4a0870cd6039e6c987b067b0d28de54efea17449175d7a8cd6ec10ab23cc5d', // base asset schemaId
            capabilities: [],
        };

        hackathon.contract = await _0xcert.deployLedger(ledger);
        hackathon.endDate = hackathon.endDate.toISOString();
        hackathon.owner = _0xcert.provider.accountId;

        console.log('Hackathon deployed with contract id ' + hackathon.contract);

        const hackathons: [any] = JSON.parse(localStorage.getItem('hackathons')) || [];
        localStorage.setItem('hackathons', JSON.stringify(hackathons.concat([hackathon])));
    }

}