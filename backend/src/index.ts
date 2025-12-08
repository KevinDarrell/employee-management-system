import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Employee Management System API is Running!');
});

// Test DB Connection
app.get('/api/test-db', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json({ message: "Database connected!", data: employees });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});