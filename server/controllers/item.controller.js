import Item from "../mongoDB/models/item.js";
import User from "../mongoDB/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// this will get All Items and .limit will limit to how many items there are.
const getAllItems = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    itemType = "",
  } = req.query;

  const query = {};
  if (itemType !== "") {
    query.itemType = itemType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Item.countDocuments({ query });

    const items = await Item.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemDetail = async (req, res) => {
  const { id } = req.params;
  const itemExists = await Item.findOne({ _id: id }).populate("creator");

  if (itemExists) {
    res.status(200).json(itemExists);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const createItem = async (req, res) => {
  try {
    const { title, description, itemType, price, photo, email } = req.body;
    // Start session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);
    const newItem = await Item.create({
      title,
      description,
      itemType,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newItem._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ messsage: "item listed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, itemType, price, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    await Item.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        itemType,
        price,
        photo: photoUrl.url || photo,
      }
    );
    res.status(200).json({ message: "Item updated Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const itemToDelete = await Item.findById({ _id: id }).populate("creator");

    if (!itemToDelete) throw new Error("Item not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    itemToDelete.remove({ session });
    itemToDelete.creator.allProperties.pull(itemToDelete);

    await itemToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getAllItems, getItemDetail, createItem, updateItem, deleteItem };
