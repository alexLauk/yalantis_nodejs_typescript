import 'reflect-metadata';
import * as fs from 'fs';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.use('/', routes);
app.use(errorHandler);

export default app;
