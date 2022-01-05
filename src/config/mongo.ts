import {connect, connection} from 'mongoose';

export const connectMongo = () =>
    new Promise<void>((resolve, reject) => {
        const user = 'dave';
        const pass = 'password';
        const host = 'localhost:27017';
        const dbName = 'dave_db';
        const dbUri = `mongodb://${user}:${pass}@${host}/${dbName}`;
        const reconnectInterval = 0;
        const autoReconnect = reconnectInterval > 0;

        connection.on('error', (err: any) => {
            console.log('error while connecting to mongodb', err);
        });

        if (!autoReconnect) {
            connection.once('error', reject); // reject first error
        }

        connection.once('open', () => {
            if (!autoReconnect) {
                connection.off('error', reject);
            }
            resolve();
        });

        connection.on('reconnected', () => {
            console.log('Connection to mongodb is resumed');
        });

        connection.on('disconnected', () => {
            console.log('Mongodb disconnected');
        });

        connect(
            dbUri,
            {
                user,
                pass,
                dbName
            }
        );

        console.log('Mongodb connected');
    });
