import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const roleSchema = new mongoose.Schema({
  value: {
      type: String,
      unique: true,
      default: "USER"
  }
});