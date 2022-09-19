import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

export const userSchema = new Schema({
  email: {
      type: String,
      unique: true,
      required: true
  },
  login: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  token: {
      type: String
  },
  roles: [{
      type: Schema.Types.ObjectId,
      ref: "Roles"
  }]
});