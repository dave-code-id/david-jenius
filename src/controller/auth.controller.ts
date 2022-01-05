// @ts-ignore
import hapi from "@hapi/hapi";
import * as Http from "../common/enum/http.enum";
import authUtil from "../util/auth.util";

const generateToken: hapi.ServerRoute = {
    method: Http.Method.GET,
    path: '/auth',
    options: {
        auth: false,
        handler: async (
            req: hapi.Request,
            res: hapi.ResponseToolkit
        ) => {
            return res.response({authToken: authUtil.generateToken()}).code(Http.StatusCode.OK);
        }
    }
};

const authController: hapi.ServerRoute[] = [
    generateToken
];

export default authController;
