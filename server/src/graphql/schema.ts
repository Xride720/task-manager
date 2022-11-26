import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Task {
  _id: String
  title: String
  description: String
  creationDate: String
  modifidedDate: String
  state: String
  orderIndex: Int
  createdBy: String
  modifidedBy: String
  responsibleUser: String
  plannedExecutionTime: String
  actualExecutionTime: String
}

input TaskInput {
  _id: String
  title: String
  description: String
  creationDate: String
  modifidedDate: String
  state: String
  orderIndex: Int
  createdBy: String
  modifidedBy: String
  responsibleUser: String
  plannedExecutionTime: String
  actualExecutionTime: String
}

input OrderInput {
  order: Int
  taskId: String
}

input TaskOrderInput {
  orderArr: [OrderInput]
}

enum TaskState {
  Created,
  InWork,
  HoldOver,
  Completed
}

enum UserRole {
  USER,
  ADMIN
}

type User {
  _id: String
  login: String
  email: String
  password: String
  role: UserRole
}

input UserInput {
  email: String!
  login: String!
  password: String!
  role: UserRole
}

input AuthUserInput {
  login: String!
  password: String!
}

type Role {
  _id: String
  value: UserRole
}

input RoleInput {
  _id: String
  value: UserRole
}

type AuthOutput {
  success: Boolean
  token: String
}

enum ChatTypeEnum {
  PRIVATE,
  GROUP
}

type ChatType {
  _id: String
  value: ChatTypeEnum 
}

type Chat {
  _id: String 
  userIds: [String] 
  createdBy: String 
  title: String 
  typeId: String 
}

input ChatInput {
  userIds: [String]
  title: String!
  typeId: String!
}

type ChatMessage {
  _id: String
  chatId: String
  createdBy: String
  creationDate: String
  content: String
}

input ChatMessageInput {
  chatId: String
  content: String
}

type Query {
  getAllTasks(userId: String): [Task]
  getUsers(ids: [String]): [User]
  getChatTypes: [ChatType]
}

type Mutation {
  deleteTask(input: String): Int
  updateTask(input: TaskInput): String
  updateTaskMany(input: [TaskInput]): String
  createTask(input: TaskInput): String

  createUser(input: UserInput): AuthOutput
  authUser(input: AuthUserInput): AuthOutput

  createChat(input: ChatInput): Int
  deleteChat(input: String): Int

  createChatMessage(input: ChatMessageInput): Int
  deleteChatMessage(input: String): Int
}

type Subscription {
  latestTasks(userId: String): [Task]
  userChatList(userId: String): [Chat]
  chatMessages(chatId: String): [ChatMessage]
}
`;