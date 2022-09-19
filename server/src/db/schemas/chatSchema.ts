import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

export const chatSchema = new Schema({
  userIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Users",
    }]
  },
  title: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: "ChatTypes"
  }
});