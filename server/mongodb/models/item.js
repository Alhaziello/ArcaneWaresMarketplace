import mongoose from "mongoose";

let Item;
try {
  Item = mongoose.model("Item");
} catch {
  const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    itemType: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  Item = mongoose.model("Item", ItemSchema);
}
export default Item;
