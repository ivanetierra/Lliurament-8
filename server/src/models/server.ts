import express, {Application, Request, Response} from 'express';
import productRoutes from '../routes/product.routes';
import db from '../db/connection.db';
import cors from 'cors';
import calendarEventRoutes from '../routes/calendarEvent.routes';


class Server {
    private app: Application;
    private port: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            });
        });
        this.app.use('/products', productRoutes);
        this.app.use('/calendar', calendarEventRoutes);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        
    }

    async dbConnection() {

        try {
            await db.authenticate();
            console.log('Database online');
        }catch (error) {
            console.log(error);
        }
        
    }
}

export default Server;