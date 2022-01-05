// @ts-ignore
import hapi from '@hapi/hapi';

export interface ICreateUser {
    userName: string,
    accountNumber: string,
    emailAddress: string,
    identityNumber: string
}

export interface IUser extends ICreateUser {
    id: string
}

export interface IGetUserRequest extends hapi.Request {
    query: Partial<IUser>
}

export interface ICreateUserRequest extends hapi.Request {
    payload: ICreateUser
}

export interface IEditUserRequest extends hapi.Request {
    params: {
        id: string
    },
    payload: Partial<ICreateUser>
}
