import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const chatTypeSchema = new mongoose.Schema({
  value: {
      type: String,
      unique: true
  }
});