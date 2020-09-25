import mongoose from "mongoose";

const schema = new mongoose.Schema({
    price: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("BitcoinSnap", schema);
