import userController from "./controller/user.controller";
import authController from "./controller/auth.controller";

const routes = [...userController, ...authController];

export default routes;
