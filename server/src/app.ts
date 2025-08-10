import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes'
// Import your routes here (e.g., authRoutes)
// import authRoutes from './routes/authRoutes';

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging HTTP requests

// ✅ Routes
app.use('/api/', authRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Welcome to GeoPixio API');
});


// ✅ Error Handling (generic fallback)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
