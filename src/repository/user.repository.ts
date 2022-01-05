import {ICreateUser, IUser} from "../interface/user.interface";
import {UserModel} from "../model/user.model";

const getUser = async (id: string): Promise<IUser | undefined> => {
    try {
        const user = await UserModel.findOne({_id: id}).exec();

        return user?.toObject({
            getters: true, transform: function (doc, ret) {
                delete ret._id
            }
        });
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

const getUsers = async (getUsersQuery: Partial<IUser>): Promise<IUser[]> => {
    const users = await UserModel.find(getUsersQuery).exec();

    return users.map(user => {
        return user?.toObject({
            getters: true, transform: function (doc, ret) {
                delete ret._id
            }
        });
    });
};

const createUser = async (
    createUserPayload: ICreateUser
): Promise<IUser> => {
    const user = await UserModel.create(createUserPayload);

    return user?.toObject({
        getters: true, transform: function (doc, ret) {
            delete ret._id
        }
    });
};

const editUser = async (
    id: string,
    updatedFields: Partial<IUser>
): Promise<void> => {
    await UserModel.findOneAndUpdate(
        {id},
        {
            ...updatedFields
        }
    );
};

const removeUser = async (
    id: string
): Promise<void> => {
    await UserModel.deleteOne(
        {_id: id}
    );
};

const userRepository = {
    getUser,
    getUsers,
    createUser,
    editUser,
    removeUser
};

export default userRepository;
