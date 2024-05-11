import express, {Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

class App {
  public app: express.Application;
  public port: string | number;
  private routes: any;

  constructor(routes: any, port?: string | number) {
    this.port = port || process.env.PORT || 8555;
    this.app = express();
    this.routes = routes;
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });

    this.app.use((err: any, req: Request, res: Response, next: any) => {
      console.error(err.stack);
      res.status(500).send('Error occured in routes!');
    });
  }
}

export default App;