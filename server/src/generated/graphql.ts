import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type AuthUserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Chat = {
  __typename?: 'Chat';
  _id?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  typeId?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ChatInput = {
  title: Scalars['String'];
  typeId: Scalars['String'];
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  _id?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
};

export type ChatMessageInput = {
  chatId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
};

export type ChatType = {
  __typename?: 'ChatType';
  _id?: Maybe<Scalars['String']>;
  value?: Maybe<ChatTypeEnum>;
};

export type ChatTypeEnum =
  | 'GROUP'
  | 'PRIVATE';

export type Mutation = {
  __typename?: 'Mutation';
  authUser?: Maybe<AuthOutput>;
  createChat?: Maybe<Scalars['Int']>;
  createChatMessage?: Maybe<Scalars['Int']>;
  createTask?: Maybe<Scalars['String']>;
  createUser?: Maybe<AuthOutput>;
  deleteChat?: Maybe<Scalars['Int']>;
  deleteChatMessage?: Maybe<Scalars['Int']>;
  deleteTask?: Maybe<Scalars['Int']>;
  updateTask?: Maybe<Scalars['String']>;
  updateTaskMany?: Maybe<Scalars['String']>;
};


export type MutationAuthUserArgs = {
  input?: InputMaybe<AuthUserInput>;
};


export type MutationCreateChatArgs = {
  input?: InputMaybe<ChatInput>;
};


export type MutationCreateChatMessageArgs = {
  input?: InputMaybe<ChatMessageInput>;
};


export type MutationCreateTaskArgs = {
  input?: InputMaybe<TaskInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationDeleteChatArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteChatMessageArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteTaskArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskArgs = {
  input?: InputMaybe<TaskInput>;
};


export type MutationUpdateTaskManyArgs = {
  input?: InputMaybe<Array<InputMaybe<TaskInput>>>;
};

export type OrderInput = {
  order?: InputMaybe<Scalars['Int']>;
  taskId?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllTasks?: Maybe<Array<Maybe<Task>>>;
  getChatTypes?: Maybe<Array<Maybe<ChatType>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetAllTasksArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUsersArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Role = {
  __typename?: 'Role';
  _id?: Maybe<Scalars['String']>;
  value?: Maybe<UserRole>;
};

export type RoleInput = {
  _id?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<UserRole>;
};

export type Subscription = {
  __typename?: 'Subscription';
  chatMessages?: Maybe<Array<Maybe<ChatMessage>>>;
  latestTasks?: Maybe<Array<Maybe<Task>>>;
  userChatList?: Maybe<Array<Maybe<Chat>>>;
};


export type SubscriptionChatMessagesArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionLatestTasksArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionUserChatListArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  _id?: Maybe<Scalars['String']>;
  actualExecutionTime?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  modifidedBy?: Maybe<Scalars['String']>;
  modifidedDate?: Maybe<Scalars['String']>;
  orderIndex?: Maybe<Scalars['Int']>;
  plannedExecutionTime?: Maybe<Scalars['String']>;
  responsibleUser?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TaskInput = {
  _id?: InputMaybe<Scalars['ID']>;
  actualExecutionTime?: InputMaybe<Scalars['String']>;
  createdBy?: InputMaybe<Scalars['String']>;
  creationDate?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  modifidedBy?: InputMaybe<Scalars['String']>;
  modifidedDate?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Int']>;
  plannedExecutionTime?: InputMaybe<Scalars['String']>;
  responsibleUser?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TaskOrderInput = {
  orderArr?: InputMaybe<Array<InputMaybe<OrderInput>>>;
};

export type TaskState =
  | 'Completed'
  | 'Created'
  | 'HoldOver'
  | 'InWork';

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  login: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<UserRole>;
};

export type UserRole =
  | 'ADMIN'
  | 'USER';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  AuthOutput: ResolverTypeWrapper<AuthOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AuthUserInput: AuthUserInput;
  Chat: ResolverTypeWrapper<Chat>;
  ChatInput: ChatInput;
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  ChatMessageInput: ChatMessageInput;
  ChatType: ResolverTypeWrapper<ChatType>;
  ChatTypeEnum: ChatTypeEnum;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderInput: OrderInput;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleInput: RoleInput;
  Subscription: ResolverTypeWrapper<{}>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  TaskOrderInput: TaskOrderInput;
  TaskState: TaskState;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserRole: UserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String'];
  AuthOutput: AuthOutput;
  Boolean: Scalars['Boolean'];
  AuthUserInput: AuthUserInput;
  Chat: Chat;
  ChatInput: ChatInput;
  ChatMessage: ChatMessage;
  ChatMessageInput: ChatMessageInput;
  ChatType: ChatType;
  Mutation: {};
  Int: Scalars['Int'];
  OrderInput: OrderInput;
  Query: {};
  Role: Role;
  RoleInput: RoleInput;
  Subscription: {};
  Task: Task;
  TaskInput: TaskInput;
  ID: Scalars['ID'];
  TaskOrderInput: TaskOrderInput;
  User: User;
  UserInput: UserInput;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthOutput'] = ResolversParentTypes['AuthOutput']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatType'] = ResolversParentTypes['ChatType']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['ChatTypeEnum']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authUser?: Resolver<Maybe<ResolversTypes['AuthOutput']>, ParentType, ContextType, Partial<MutationAuthUserArgs>>;
  createChat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationCreateChatArgs>>;
  createChatMessage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationCreateChatMessageArgs>>;
  createTask?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationCreateTaskArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['AuthOutput']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteChat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationDeleteChatArgs>>;
  deleteChatMessage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationDeleteChatMessageArgs>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<MutationDeleteTaskArgs>>;
  updateTask?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationUpdateTaskArgs>>;
  updateTaskMany?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationUpdateTaskManyArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType, Partial<QueryGetAllTasksArgs>>;
  getChatTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChatType']>>>, ParentType, ContextType>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryGetUsersArgs>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  chatMessages?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['ChatMessage']>>>, "chatMessages", ParentType, ContextType, Partial<SubscriptionChatMessagesArgs>>;
  latestTasks?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, "latestTasks", ParentType, ContextType, Partial<SubscriptionLatestTasksArgs>>;
  userChatList?: SubscriptionResolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, "userChatList", ParentType, ContextType, Partial<SubscriptionUserChatListArgs>>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actualExecutionTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifidedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifidedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  plannedExecutionTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responsibleUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthOutput?: AuthOutputResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  ChatMessage?: ChatMessageResolvers<ContextType>;
  ChatType?: ChatTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';
export type ChatDbObject = {
  _id?: Maybe<ObjectId>,
  createdBy?: Maybe<string>,
  title?: Maybe<string>,
  typeId?: Maybe<string>,
  userIds?: Maybe<Array<Maybe<string>>>,
};

export type ChatMessageDbObject = {
  _id?: Maybe<ObjectId>,
  chatId?: Maybe<string>,
  content?: Maybe<string>,
  createdBy?: Maybe<string>,
  creationDate?: Maybe<string>,
};

export type RoleDbObject = {
  _id?: Maybe<ObjectId>,
  value?: Maybe<string>,
};

export type TaskDbObject = {
  _id?: Maybe<ObjectId>,
  actualExecutionTime?: Maybe<string>,
  createdBy?: Maybe<string>,
  creationDate?: Maybe<string>,
  description?: Maybe<string>,
  modifidedBy?: Maybe<string>,
  modifidedDate?: Maybe<string>,
  orderIndex?: Maybe<number>,
  plannedExecutionTime?: Maybe<string>,
  responsibleUser?: Maybe<string>,
  state?: Maybe<string>,
  title?: Maybe<string>,
};

export type UserDbObject = {
  _id?: Maybe<ObjectId>,
  email?: Maybe<string>,
  login?: Maybe<string>,
  password?: Maybe<string>,
  role?: Maybe<string>,
};
