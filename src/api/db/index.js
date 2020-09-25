import mongoose from "mongoose";

export default async (mongoDbUri) => {
    const mongo = await mongoose.connect(mongoDbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongo.connection.db;
};
