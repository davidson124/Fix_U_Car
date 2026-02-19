import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';
import adminRoutes from './routes/admin.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import conversationRoutes from './routes/conversation.route.js';
import User from './models/User.model.js'

const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/conversations', conversationRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});