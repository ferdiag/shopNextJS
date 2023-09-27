import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    likes: Number,
    description: String,
    id: String,
    fileType: String,
    price: String,
    category: String
});
const Picture = mongoose.models.Picture || mongoose.model('Picture', schema, "pictures");

export { Picture } 