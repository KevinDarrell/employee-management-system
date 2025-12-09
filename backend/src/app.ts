import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/employees', employeeRoutes);


app.get('/', (req, res) => {
  res.send('Employee Management System API v1.0');
});


app.use(errorHandler as unknown as express.ErrorRequestHandler);

export default app;