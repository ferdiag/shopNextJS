import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    description: String,
    id: String,
    fileType: String
});
const Picture = mongoose.models.Picture || mongoose.model('Picture', schema, "pictures");

export { Picture } 