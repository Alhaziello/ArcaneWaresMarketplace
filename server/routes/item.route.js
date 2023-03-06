import express from "express";

import {
  createItem,
  deleteItem,
  getAllItems,
  getItemDetail,
  updateItem,
} from "../controllers/item.controller.js";

const router = express.Router();

router.route("/").get(getAllItems);
router.route("/:id").get(getItemDetail);
router.route("/").post(createItem);
router.route("/:id").patch(updateItem);
router.route("/:id").delete(deleteItem);



export default router;
