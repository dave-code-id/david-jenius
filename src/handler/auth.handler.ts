import {Request} from '@hapi/hapi';
import authUtil from "../util/auth.util";
import ERROR from "../common/error/error";
// @ts-ignore
import Boom from "@hapi/boom";

const verifyToken = async (req: Request) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token || !authUtil.verifyToken(token)) throw Boom.unauthorized(ERROR.UNAUTHORIZED);
    return req;
}

const authHandler = {
    verifyToken
}

export default authHandler;
