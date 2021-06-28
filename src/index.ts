/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import logger from './utils/logger';
import router from './routes';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

const port = process.env.USER_GATEWAY_PORT;

app.use('/api', router);

app.get('/toto', (req: Request, res: Response) => {
  res.json({ greeting: `Hello, Good Morning ${port} !` });
});

app.use((req, res, _next): void => {
  res.status(404).send({
    status: false,
    error: 'resource not found',
  });
});

// handle unexpected errors
app.use((err: any, req: Request, res: Response, _next: NextFunction): void => {
  res.status(err.status || 500).send({
    success: false,
    error: 'Internal server error.',
  });
});

app.listen(port, () => {
  logger.info(`App is listening on port ${port} !`);
});
