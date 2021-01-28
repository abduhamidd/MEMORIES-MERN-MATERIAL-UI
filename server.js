import express from 'express';
import mongoose from 'mongoose';
import postRouter from './router/postRouter.js';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 60212;
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/memories', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));
app.listen(process.env.PORT || port, () => {
  console.log(`Server ready on localhost:${port}`);
});
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/memories/', postRouter);
app.get('/', (req, res) => {
  res.send('Hello Heroku');
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});
console.log(process.env.MONGODB_URL);
