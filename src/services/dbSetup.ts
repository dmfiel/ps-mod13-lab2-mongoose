import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createUserModel } from '../models/userModel';
import { createProductModel } from '../models/productModel';
import { createBookModel } from '../models/bookModel';

dotenv.config();
const DB_URI = process.env.DB_URI || '';
const DB_NAME = process.env.DB_NAME || '';

export const db = {
  client: mongoose.connection,
  user: mongoose.Model,
  product: mongoose.Model,
  book: mongoose.Model
};

export function dbConnect(): boolean {
  db['client'] = mongoose.createConnection(DB_URI);
  console.log('Connected successfully to MongoDB!');

  db.client = db.client.useDb(DB_NAME);
  switch (db.client.readyState) {
    case 1: // connected
    case 2: // connecting
      console.log(`Successfully connected to database (${DB_NAME}).`);
      db.user = createUserModel(db.client);
      db.product = createProductModel(db.client);
      db.book = createBookModel(db.client);
      return true;
      break;
    default: // 0: disconnected, 3: disconnecting
      console.log(`Unable to connect to database (${DB_NAME}).`);
      return false;
  }
}
