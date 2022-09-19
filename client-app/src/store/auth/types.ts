import { ChatType, Maybe, Task, User, UserRole } from "@generated/graphql";

export type AuthStateType = {
    email?: string;
    token?: string;
    tokenInfo?: {
        id: string,
        roles: UserRole[],
        email: string
    };
    users: Maybe<UserInfo>[];
    chatTypes: Maybe<ChatType>[];
};

export type UserInfo = Omit<User, 'password'>;

