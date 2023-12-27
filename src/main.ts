import mongoose from 'mongoose';
import { App } from './infra/App';

const app = new App();

process.env.DB_HOST &&
  mongoose
    .connect(process.env.DB_HOST)
    .then(() => {
      app.init();
      console.log('Database connection successful');
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
