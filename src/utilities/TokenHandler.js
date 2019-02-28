import jwt from 'jsonwebtoken';
const secretKey = 'blablabla';

class TokenHandler {
  authenticate(req, res, next) {
    const { token } = req.headers;
    console.log(req.headers);
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized request' });
      } else {
        req.data = decoded;
        next();
      }
    });
  }

  sign(body, res, callback) {
    jwt.sign(
      body,
      secretKey,
      {
        expiresIn: 60 * 60
      },
      (err, token) => {
        if (err) {
          console.log('Err', err);
          res.status(500).json({ message: 'Server Error' });
        } else {
          callback(token);
        }
      }
    );
  }
}

export default new TokenHandler();
