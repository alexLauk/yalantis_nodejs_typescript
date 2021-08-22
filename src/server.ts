import path from 'path';
import express from 'express';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log'),
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.use('/api', routes);
app.use(errorHandler);

export default app;
