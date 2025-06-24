import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma';
import taskRoutes from './routes/task.routes';
import groupRoutes from './routes/group.routes';
import taskGroupRoutes from './routes/taskGroup.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes); 
app.use('/api/groups', groupRoutes);
app.use('/api/task-groups', taskGroupRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 