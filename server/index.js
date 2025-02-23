import express from "express";
import v2 from "./routes/v2.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after an hour",
});

app.use(limiter);

app.use((req, res, next) => {
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin); 
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use("/api", v2);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
