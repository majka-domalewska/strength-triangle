import { MongoClient } from "mongodb";

const uri = "mongodb+srv://majadomalewska:thestrengthtriangle@thestrengthtriangle.xibbo.mongodb.net/?retryWrites=true&w=majority&appName=TheStrengthTriangle";
const client = new MongoClient(uri);

client.on("error", (err) => {
    console.error("Database error: ", err);
});

client.on("connect", () => {
    console.log("Database connected successfully. ");
});

export default client;