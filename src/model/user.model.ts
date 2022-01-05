// @ts-ignore
import mongoose, {Document, Model, Schema} from 'mongoose';
import {IUser} from "../interface/user.interface";

export const collectionName = 'users';
export type UserDocument = IUser & Document;

const UserSchema: Schema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true
        },
        accountNumber: {
            type: String,
            unique: true,
            required: true
        },
        emailAddress: {
            type: String,
            unique: true,
            required: true
        },
        identityNumber: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export const UserModel: Model<UserDocument> = mongoose.model(collectionName, UserSchema);
