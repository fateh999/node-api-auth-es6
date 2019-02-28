import express from 'express';
import AuthController from '../controllers/AuthController';
import TokenHandler from '../utilities/TokenHandler';

const router = express.Router();

router.get('', (req, res) =>
  res.json({
    message: 'Auth Router working'
  })
);

router.post('/signup', AuthController.signup);

router.post('/login', AuthController.login);

router.get('/details', TokenHandler.authenticate, AuthController.getDetails);

export default router;
