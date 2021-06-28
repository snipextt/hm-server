import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const AdminMiddlewere = (req: Request, res: Response, next: Function) => {
  const authToken = req.headers['authorization']!;
  if (!authToken)
    return res.status(403).json({ err: 'Auth header not present' });
  verify(authToken, 'key', {}, function (err, decoded) {
    if (err) return res.status(403).json({ err: 'Invalid auth token' });
    else {
      if (decoded!.userType !== 'a')
        return res.status(401).json({ err: 'Unauthorized' });
      else next();
    }
  });
};
export default AdminMiddlewere;
