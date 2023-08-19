import mongoose from "mongoose";
const connect = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDB", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", function () {
        console.log("Connection Successful!");

    });
    const collection = await db.collection("pictures")
    const res = await collection.find().toArray()
    return db
}
export { connect }