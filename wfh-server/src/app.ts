import express, {NextFunction, Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js';
import notFoundError from './exceptions/notFoundError.js';

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
    this.initializeErrorHandler();
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

  private initializeErrorHandler() {
    this.app.use(errorHandler);
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      const method = req.method;
      const error = new notFoundError("Route Not Found! URL: " + url + " Method: " + method );
      throw(error);
    });
  }
}

export default App;