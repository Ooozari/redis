import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(errorHandler);
export default app;
