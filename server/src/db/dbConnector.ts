import mongoose from "mongoose";
import { environment, EnvType } from "../config";
import { chatMessageSchema } from "./schemas/chatMessageSchema";
import { chatSchema } from "./schemas/chatSchema";
import { chatTypeSchema } from "./schemas/chatTypeSchema";
import { roleSchema } from "./schemas/roleSchema";
import { taskSchema } from "./schemas/taskSchema";
import { userSchema } from "./schemas/userSchema";

const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

mongoose.connect(environment[env as EnvType].dbString, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Tasks = mongoose.model('Tasks', taskSchema);
const Users = mongoose.model('Users', userSchema);
const Roles = mongoose.model('Roles', roleSchema);
const Chats = mongoose.model('Chats', chatSchema);
const ChatTypes = mongoose.model('ChatTypes', chatTypeSchema);
const ChatMessages = mongoose.model('ChatMessages', chatMessageSchema);

export { Tasks, Users, Roles, Chats, ChatMessages, ChatTypes };