import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

export const chatMessageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chats",
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  creationDate: {
    type: String
  },
  content: {
    type: String
  }
});