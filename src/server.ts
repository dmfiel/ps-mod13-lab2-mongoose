import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { dbConnect } from './services/dbSetup';
import userRoutes from './routes/userRouter';
import productRoutes from './routes/productRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;

export const app = express();

function startServer(): boolean {
  if (!dbConnect()) return false;

  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Lab 2 Server.' });
  });

  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/books', bookRoutes);

  app.listen(LISTEN_PORT, () =>
    console.log(
      `Server listening on port ${LISTEN_PORT}  http://localhost:${LISTEN_PORT}`
    )
  );

  return true;
}

startServer();
