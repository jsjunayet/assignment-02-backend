import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('start our assigment');
});

export default app;
