import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cluster from 'cluster';
import os from 'os';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

// --- SIMPLE RATE LIMITER MIDDLEWARE ---
// Controls traffic by limiting requests from a single IP (e.g., 100 requests per 15 minutes)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

const getClientIp = (req) => {
  // In production/cloud (Heroku/Render), the real IP is in the x-forwarded-for header
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || req.ip;
};

const rateLimiterMiddleware = (req, res, next) => {
  const ip = getClientIp(req);
  const now = Date.now();

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const timestamps = rateLimit.get(ip);
  // Remove timestamps outside the window
  const validTimestamps = timestamps.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validTimestamps.length >= MAX_REQUESTS) {
    console.warn(`Rate Limit Exceeded for IP: ${ip}`);
    return res.status(429).json({ 
      message: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((validTimestamps[0] + RATE_LIMIT_WINDOW - now) / 1000)
    });
  }

  validTimestamps.push(now);
  rateLimit.set(ip, validTimestamps);
  next();
};

// --- CLUSTER LOGIC (LOAD BALANCER) ---
if (cluster.isPrimary) {
  console.log(`Primary Load Balancer (PID: ${process.pid}) is running`);
  console.log(`Forking server for ${numCPUs} CPUs...`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers and restart them (High Availability)
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // --- WORKER PROCESS (EXPRESS APP) ---
  
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Request Logging Middleware (Debug)
  app.use((req, res, next) => {
    console.log(`[Worker ${process.pid}] ${req.method} ${req.url}`);
    next();
  });

  app.use(rateLimiterMiddleware); // Apply Traffic Control

  // Database Connection
  // Note: Mongoose manages its own connection pool, so each worker opens its own connection.
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/couturelafleur')
    .then(() => console.log(`Worker ${process.pid}: MongoDB Connected`))
    .catch(err => console.log(`Worker ${process.pid}: MongoDB Connection Error:`, err));

  // Routes
  app.use('/api/products', productRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/payment', paymentRoutes);
  app.use('/api', contactRoutes);

  // Health Check
  app.get('/', (req, res) => {
    res.send(`CoutureLaFleur API is handled by Worker ${process.pid}`);
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}