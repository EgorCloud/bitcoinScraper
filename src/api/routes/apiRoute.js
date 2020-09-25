import { Router } from "express";
import bitcoinModel from "../db/models/bitcoinModel";
import BitcoinGetter from "../services/bitcoinGetter";

const route = Router();

export default (config) => {
    const bitcoinService = new BitcoinGetter(config);
    route.get("/get", async (req, res) => {
        res.json(await bitcoinModel.find());
    });

    route.post("/settime", async ({ body }, res) => {
        const { seconds } = body;

        if (+seconds === parseInt(seconds, 10)) {
            bitcoinService.changeExpTime(seconds);
            console.log("time changed");
            res.status(200);
            res.json({
                status: 200,
            });
        } else {
            res.status(400);
            res.json({
                status: 400,
                message: '"seconds" must be a number',
            });
        }
    });
    return route;
};
