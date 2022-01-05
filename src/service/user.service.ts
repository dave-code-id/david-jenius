import {ICreateUser, IUser} from "../interface/user.interface";
import userRepository from "../repository/user.repository";
import ERROR from "../common/error/error";
import {validateFields} from "../util/user.util";
// @ts-ignore
import Boom from "@hapi/boom";
import redis from "../config/redis";
import { merge } from 'lodash';

const getUser = async (id: string): Promise<IUser> => {
    const userCache = await redis.get(id);
    if (userCache) return JSON.parse(userCache);

    const user = await userRepository.getUser(id);
    if (!user) throw Boom.notFound(ERROR.NOT_FOUND);

    await redis.set(id, JSON.stringify(user));

    return user;
};

const getUsers = async (getUsersQuery: Partial<IUser>): Promise<IUser[]> => {
    const users = await userRepository.getUsers(getUsersQuery);

    return users.map(value => {
        redis.set(value.id, JSON.stringify(value));
        return value;
    });
};

const createUser = async (
    createUserPayload: ICreateUser
): Promise<string> => {
    await validateFields(createUserPayload);

    const createdUser = await userRepository.createUser(createUserPayload);

    await redis.set(createdUser.id, JSON.stringify(createdUser));

    return createdUser.id;
};

const editUser = async (
    id: string,
    updatedFields: Partial<ICreateUser>
): Promise<void> => {
    const user = await getUser(id);

    await validateFields(updatedFields);

    await userRepository.editUser(user.id, updatedFields);

    await redis.set(user.id, JSON.stringify(merge(user, updatedFields)));
};

const removeUser = async (
    id: string
): Promise<void> => {
    const user = await getUser(id);

    await redis.expire(user.id, 0);

    await userRepository.removeUser(user.id);
};

const userService = {
    getUser,
    getUsers,
    createUser,
    editUser,
    removeUser
};

export default userService;
