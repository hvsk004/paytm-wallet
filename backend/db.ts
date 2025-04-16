import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { IAccount, IUser } from "./types";
import { string } from "zod";

const DB_URL: string = process.env.DB_URL || "mongodb://localhost:27017/paytm";
mongoose.connect(DB_URL)

const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        default: uuidv4,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<IUser>("User", userSchema);


const accountSchema = new Schema<IAccount>({
    accountId: {
        type: String,
        required: true,
        default: uuidv4
    },
    userId: {
        ref: "User",
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const Account = mongoose.model<IAccount>("Account", accountSchema);

export { User, Account };
