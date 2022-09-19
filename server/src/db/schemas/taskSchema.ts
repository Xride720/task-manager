import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema({
  _id: {
      type: ObjectId
  },
  title: {
      type: String
  },
  description: {
      type: String
  },
  creationDate: {
      type: String
  },
  modifidedDate: {
      type: String
  },
  state: {
      type: String
  },
  orderIndex: {
      type: Number
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
  },
  modifidedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
  },
  responsibleUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
  },
  plannedExecutionTime: {
      type: String
  },
  actualExecutionTime: {
      type: String
  }
});