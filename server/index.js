import express from 'express';
import api from './routes/api.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware to parse json bodies
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // allow all origins for now
  next();
})

app.use('/api', api);
// all routes defined on api.js will be prefixed with /api => /api/code/repo

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});