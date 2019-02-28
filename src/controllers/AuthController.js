import User from '../models/User';
import TokenHandler from '../utilities/TokenHandler';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: 'Email is required.'
      });
    }
    if (!password) {
      return res.status(400).json({
        message: 'Password is required.'
      });
    }

    try {
      const user = await User.findOne({
        email
      });

      if (user) {
        const hash = user.password;
        const checkPass = bcrypt.compareSync(password, hash);
        console.log('checkPass', checkPass);

        if (checkPass) {
          TokenHandler.sign(
            { email: user.email, name: user.name },
            res,
            token => {
              res.status(200).json({
                message: 'Loggedin Successfully.',
                token
              });
            }
          );
        } else {
          return res.status(401).json({
            message: 'Invalid credentials.'
          });
        }
      } else {
        res.status(404).json({
          message: 'User not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server error.'
      });
    }
  }

  async signup(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        message: 'Name is required.'
      });
    }
    if (!email) {
      return res.status(400).json({
        message: 'Email is required.'
      });
    }
    if (!password) {
      return res.status(400).json({
        message: 'Password is required.'
      });
    }

    const hash = bcrypt.hashSync(password, salt);

    try {
      const checkuser = await User.findOne({
        email
      });

      if (checkuser) {
        return res.status(400).json({
          message: 'User already exists.'
        });
      }

      await User.create({
        name,
        email,
        password: hash
      });

      return res.status(200).json({
        message: 'Signup successfull.'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error.'
      });
    }
  }

  async getDetails(req, res) {
    res.status(200).json(req.data);
  }
}

export default new AuthController();
