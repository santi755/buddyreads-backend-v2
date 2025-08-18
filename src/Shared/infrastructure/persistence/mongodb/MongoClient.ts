import mongoose from 'mongoose';

import { env } from '#root/config/env.ts';

mongoose
  .connect(env.MONGODB_URI)
  .then()
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

export { mongoose };
