import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    shoppingCard: [],
    sales: []
});
const User = mongoose.models.User || mongoose.model('User', schema, "users");

export { User } 