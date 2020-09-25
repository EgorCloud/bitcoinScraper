import NodeCache from "node-cache";
import fetch from "node-fetch";
import BitcoinModel from "../db/models/bitcoinModel";

export default class BitcoinGetter {
    constructor(config) {
        this.seconds = config.bitcoinDefaultSeconds;
        this.cronName = "bitcoin/getCurrentState";
        this._cache = new NodeCache({
            checkperiod: 60,
        });
        this._cache.set(this.cronName, "1", this.seconds);

        this._cache.on("expired", async () => {
            this._cache.set(this.cronName, "1", this.seconds);
            const price = await fetch(config.coinMarketCapApi, {
                method: "get",
                headers: { "X-CMC_PRO_API_KEY": config.coinMarketCapApiKey },
            })
                .then((res) => res.json())
                .then((json) => `${json.data["1"].quote.USD.price} $`);
            await new BitcoinModel({
                price,
            }).save();
        });
    }

    changeExpTime(seconds) {
        this.seconds = seconds;
        if (this._cache.get(this.cronName)) {
            this._cache.del(this.cronName);
        }
        this._cache.set(this.cronName, "1", this.seconds);
    }
}
