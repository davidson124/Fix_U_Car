import express from 'express';
import connectDB from './config/db.js';
import User from './models/User.model.js'


const app = express();
const PORT=process.env.PORT;
connectDB();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});