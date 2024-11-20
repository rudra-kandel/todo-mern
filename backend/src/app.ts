import { initializeDatabase } from '@config/database.config';
import errorHandler from '@middlewares/errorHandler.middleware';
import corsOptionsDelegate from '@utils/corsOptionDelegate';
import api from 'api';
import constants from 'constants/constants';
import cors from 'cors';
import express, { Application } from 'express';
import 'express-async-errors';
import httpContext from 'express-http-context';
import helmet from 'helmet';

//create express application
const app: Application = express();

//----------Global Middlewares-------------

//get and set per-request context (eg: we can set user here so it can be accessed from anywhere in controller or service without using req method)
app.use(httpContext.middleware);
//sets security HTTP headers
app.use(helmet());
//parse json request body
app.use(express.json());
//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
//acess for only valid domain
app.use(cors(corsOptionsDelegate));
//database connection
initializeDatabase()

app.use(constants.API_ROOT_PATH, api);

app.use(errorHandler);

export default app;
