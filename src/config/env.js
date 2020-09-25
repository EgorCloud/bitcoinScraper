import dotenv from "dotenv";
import InitError from "../api/errors/init.error";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "development" && !dotenv.config()) {
    throw new InitError("No .env file found.");
}
const config = {
    port: +process.env.PORT,
    mongoDbUri: process.env.MONGO_DB_URI,
    corsProtection: process.env.CORS_PROTECTION,
    corsConnection: JSON.parse(process.env.CORS_CONNECTION),
    bitcoinDefaultSeconds: +process.env.BITCOIN_DEFAULT_SECONDS,
    coinMarketCapApi: process.env.COINMARKETCAP_API,
    coinMarketCapApiKey: process.env.COINMARKETCAP_APIKEY,
};

export default config;
