import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

async function main() {
  try {
    await mongoose.connect(config.Mongodb_url as string);
    console.log('successfull mongodb connected');
  } catch (err) {
    console.log(err);
  }
}

app.listen(config.port, () => {
  console.log(`assignment-02 backend start ${config.port}`);
});

main();
