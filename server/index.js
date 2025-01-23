import express from "express";
import api from "./routes/api.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware to parse json bodies
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after an hour",
});

app.use(limiter);

app.use((req, res, next) => {
  const allowedOrigin = process.env.FRONTEND_URL;
  // const allowedOrigin = "http://localhost:5174";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin); // allow all origins for now
  res.setHeader("Access-Control-Allow-Methods", "GET"); //only get req

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use("/api", api);
// all routes defined on api.js will be prefixed with /api => /api/code/repo

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
