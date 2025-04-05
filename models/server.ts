import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from "cors";
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private paths = {
        user: '/usuarios'
    };

    constructor () {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error: unknown) {
            console.log(error);
        }
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.paths.user, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

export default Server;