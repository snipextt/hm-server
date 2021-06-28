import { compare, genSalt, hash } from 'bcryptjs';
import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from '../../db';
import AdminMiddlewere from './utils/AdminMiddlewere';

const AuthRouter = Router();

AuthRouter.post('/login', async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.password || !userInfo.email)
    return res.status(400).json({ err: 'Missing required field' });
  const user = await User.findOne({
    email: userInfo.email,
  }).catch((err) => {
    res.status(500).json({ err });
  });
  if (!user) return res.status(400).json({ err: 'User does not exist' });
  const match = await compare(userInfo.password, user.password);
  if (!match) return res.status(400).json({ err: 'Invalid password' });
  sign(
    { userType: user.userType },
    'key',
    (err: Error | null, authToken: string | undefined) => {
      if (err) res.status(500).json(err);
      else res.status(200).json({ authToken });
    }
  );
});

AuthRouter.post('/register', async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.password)
    return res.status(400).json({ err: 'Missing password field' });
  const salt = await genSalt(10);
  const passwordHash = await hash(userInfo.password, salt);
  const user = await User.create({
    ...userInfo,
    password: passwordHash,
    userType: 'p',
  }).catch((err: any) => {
    res.status(400).json({ err: err });
  });
  if (user) res.status(200).json(user);
});

export default AuthRouter;
