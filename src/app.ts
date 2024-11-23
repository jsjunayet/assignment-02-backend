import express from 'express';
import cros from 'cors';
import { CarRouter } from './app/Modular/Car/Car.Route';
const app = express();

app.use(cros());
app.use(express.json());
app.use('/api', CarRouter);
app.get('/', (req, res) => {
  res.send('assigment Start');
});

export default app;
