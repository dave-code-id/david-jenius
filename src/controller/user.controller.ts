// @ts-ignore
import hapi from '@hapi/hapi';
import {ICreateUserRequest, IEditUserRequest, IGetUserRequest} from "../interface/user.interface";
import userService from "../service/user.service";
import * as Http from "../common/enum/http.enum";
import authHandler from "../handler/auth.handler";

const getUser: hapi.ServerRoute = {
    method: Http.Method.GET,
    path: '/users/{id}',
    options: {
        auth: false,
        pre: [{
            method: authHandler.verifyToken
        }],
        handler: async (
            req: hapi.Request,
            res: hapi.ResponseToolkit
        ) => {
            return await userService.getUser(req.params.id).then(value => {
                return res.response(value).code(Http.StatusCode.OK);
            })
        }
    }
};

const getUsers: hapi.ServerRoute = {
    method: Http.Method.GET,
    path: '/users',
    options: {
        auth: false,
        pre: [{
            method: authHandler.verifyToken
        }],
        handler: async (
            req: IGetUserRequest,
            res: hapi.ResponseToolkit
        ) => {
            const result = await userService.getUsers(req.query);
            return res.response(result).code(Http.StatusCode.OK);
        }
    }
};

const createUser: hapi.ServerRoute = {
    method: Http.Method.POST,
    path: '/users',
    options: {
        auth: false,
        pre: [{
            method: authHandler.verifyToken
        }],
        handler: async (
            req: ICreateUserRequest,
            res: hapi.ResponseToolkit
        ) => {
            return await userService.createUser(req.payload).then(value => {
                return res.response({id: value}).code(Http.StatusCode.CREATED);
            })
        }
    }
};

const editUser: hapi.ServerRoute = {
    method: Http.Method.PATCH,
    path: '/users/{id}',
    options: {
        auth: false,
        pre: [{
            method: authHandler.verifyToken
        }],
        handler: async (
            req: IEditUserRequest,
            res: hapi.ResponseToolkit
        ) => {
            return await userService.editUser(req.params.id, req.payload).then(() => {
                return res.response('UPDATED').code(Http.StatusCode.NO_CONTENT);
            });
        }
    }
};

const removeUser: hapi.ServerRoute = {
    method: Http.Method.DELETE,
    path: '/users/{id}',
    options: {
        auth: false,
        pre: [{
            method: authHandler.verifyToken
        }],
        handler: async (
            req: hapi.Request,
            res: hapi.ResponseToolkit
        ) => {
            return await userService.removeUser(req.params.id).then(() => {
                return res.response('DELETED').code(Http.StatusCode.ACCEPTED);
            });
        }
    }
};

const userController: hapi.ServerRoute[] = [
    getUser,
    getUsers,
    createUser,
    editUser,
    removeUser
];

export default userController;
