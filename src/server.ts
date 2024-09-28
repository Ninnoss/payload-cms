import express from 'express';
import payload from 'payload';
import { formSubmissionLimiter } from './middleware/rateLimit';
import cors from 'cors';
import { allowedOrigins } from './utils/allowedOrigins';

require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  })
);

// Apply rate limiter to the form submissions POST route only
app.use('/api/apply', formSubmissionLimiter);

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(process.env.PORT || 3001);
};

start();
