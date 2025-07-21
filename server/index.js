// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import xeroRoutes from './routes/xeroRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // Logging requests
app.use(helmet({ crossOriginResourcePolicy: false })); // Security headers

app.use(cors({
  credentials: true,
  origin: process.env.XERO_FRONTEND_URL // Your frontend URL from .env
}));

// Routes
app.use('/', xeroRoutes);

app.get("/server", (req, res) => {
  res.json({
    message: "Server is running on port " + PORT
  });
});

// Port setup
const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
