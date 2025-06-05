import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { config } from 'dotenv';
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
// app.use('/api', routes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 