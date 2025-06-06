import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { config } from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { AppDataSource } from './config/data-source';
import { bookingRoutes } from './routes/booking.routes';
import { roomingListRoutes } from './routes/roomingList.routes';

config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: (origin, callback) => {
  if (!origin) return callback(null, true);

  if (origin.match(/^https?:\/\/localhost:\d+$/)) {
    return callback(null, true);
  }

  const allowedDomains = [process.env.FRONTEND_URL || 'http://localhost:3000'];
  if (allowedDomains.indexOf(origin) !== -1) {
    return callback(null, true);
  }

  callback(new Error('Not allowed by CORS'));

},
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
allowedHeaders: ['Content-Type', 'Authorization'],
credentials: true,
}));

app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooming-lists', roomingListRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize().then(() => {
  console.log('Conexão com o banco de dados estabelecida');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 