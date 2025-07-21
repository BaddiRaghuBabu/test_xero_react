// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import xeroRoutes from './routes/xeroRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use('/get', xeroRoutes);

// Example route to test
app.get('/', (req, res) => {
  res.send('server is connected');
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
