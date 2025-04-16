export interface IUser extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    comparePassword(candidatePassword: string): boolean;
};

export interface IAccount extends Document {
    accountId: string,
    userId: string,
    balance: number,
}

export type SignupInput = Exclude<IUser, "userId">
export type LoginInput = Pick<IUser, "username" | "password">;
export type UpdateInput = Pick<IUser, "password" | "firstName" | "lastName">;