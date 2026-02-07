import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import User from './models/User.model.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});