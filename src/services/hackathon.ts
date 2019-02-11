import { AssetLedger, AssetLedgerCapability } from '@0xcert/ethereum-asset-ledger';
import { Cert } from '@0xcert/cert';
import { Object86, schema86 } from '@0xcert/conventions';
import axios from 'axios';
import _0xcert from './0xcert';

export default class {

    constructor() {
        axios.defaults.baseURL = 'https://hackert-9354.restdb.io/rest'
        axios.defaults.headers['x-apikey'] = '5c612021f210985199db5536';
    }

    async list() {
        await _0xcert.enable();

        return await axios.get('/hackathons').then(res => res.data.map(hackathon => ({
            ...hackathon,
            owned: hackathon.owner === _0xcert.provider.accountId
        })));
    }

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
        hackathon.prizeImprint = await this.createPrize(hackathon);

        console.log('Hackathon deployed with contract id ' + hackathon.contract);

        await axios.post('/hackathons', hackathon);
    }

    private async createPrize(hackathon) {
        const data = {
            name: `${hackathon.title} First Prize`,
            description: `The very first plaze of the ${hackathon.title} hackathon!`,
            image: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/trophy_1f3c6.png',
        } as Object86;

        const cert = new Cert({
            schema: schema86,
        });

        return await cert.imprint(data);
    }

    async assignWinner(hackathon, winnerAddress) {
        await _0xcert.enable();

        const asset = {
            id: `${hackathon.symbol}-1`,
            imprint: hackathon.prizeImprint,
            receiverId: winnerAddress
        };

        const ledger = await _0xcert.getLedger(hackathon.contract);
        await ledger.createAsset(asset).then((mutation) => mutation.complete());

        console.log('Asset assigned to ' + winnerAddress);
    }

}