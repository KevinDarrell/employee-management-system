import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes'; 
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes); 

app.get('/', (req, res) => {
  res.send('Employee Management System API is Running!');
});

app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});