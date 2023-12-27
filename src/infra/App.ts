import mongoose from 'mongoose';
import { Tcp } from './Tcp';
import { IService } from '../types/types';
import 'dotenv/config';

export class App implements IService {
  private static instance: App;

  private tcp: IService = new Tcp();

  constructor() {
    if (!App.instance) {
      App.instance = this;
    }

    return App.instance;
  }

  async init() {
    const { tcp } = this;
    console.log('App started');

    process.env.DB_HOST &&
      mongoose
        .connect(process.env.DB_HOST)
        .then(() => {
          tcp.init();
          console.log('Database connection successful');
        })
        .catch((error) => {
          console.log(error.message);
          process.exit(1);
        });

    return true;
  }
}
