import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

let User;

try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", UserSchema);
}

export default User;
