import express from 'express';
import auth from './routes/auth';
import mongooseConnect from './db.config';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('', (req, res) => {
  res.json({ message: 'Api working' });
});

app.use('/auth', auth);

(async () => {
  try {
    await mongooseConnect();
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running on port=${port}`);
    });
  } catch (error) {
    console.log('Cannot reach database');
  }
})();
