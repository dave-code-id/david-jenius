import ERROR from "../common/error/error";
import {ICreateUser} from "../interface/user.interface";
import userService from "../service/user.service";
// @ts-ignore
import Boom from "@hapi/boom";

const mapKeyToErrorCode = new Map([
    ["userName", ERROR.USER_NAME_ALREADY_EXIST],
    ["accountNumber", ERROR.ACCOUNT_NUMBER_ALREADY_EXIST],
    ["emailAddress", ERROR.EMAIL_ADDRESS_ALREADY_EXIST],
    ["identityNumber", ERROR.IDENTITY_NUMBER_ALREADY_EXIST]
]);

export const validateFields = async (payload: Partial<ICreateUser>): Promise<void> => {
    for (const [key, value] of Object.entries(payload)) {
        const user = await userService.getUsers({[key]: value});

        if (user.length > 0) throw Boom.conflict(mapKeyToErrorCode.get(key));
    }
}
