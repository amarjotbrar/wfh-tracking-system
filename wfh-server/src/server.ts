import dotenv from 'dotenv';

import connectToMongoDb from './database/db.js';
import App from './app.js';
import routes from './routes/main.js';

dotenv.config();

connectToMongoDb(process.env.URI);

const app = new App([new routes()])
app.listen();