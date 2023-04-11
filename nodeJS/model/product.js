import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  username: String,
  mail: String,
  phone: Number,
});
export default mongoose.model("Products", productSchema);
