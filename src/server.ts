// @ts-ignore
import hapi from '@hapi/hapi';
// @ts-ignore
import jwt from '@hapi/jwt';
import routes from "./routes";
import {connectMongo} from "./config/mongo";

const createServer = async () => {

    const server = new hapi.Server({
        port: 3000,
        host: 'localhost'
    });
    server.route(routes);

    await server.register(jwt);

    return server;
};

export const init = async () => {
    await connectMongo();
    const server = await createServer();
    await server
        .initialize()
        .then(() =>
            console.log(`server started at ${server.info.host}:${server.info.port}`)
        );
    return server;
};

export const start = async () => {
    console.log('Start server');
    await init()
        .then(server => server.start())
        .then()
        .catch(err => {
            console.log('Server cannot start', err);
            process.exit(1);
        });
};

start().then();
