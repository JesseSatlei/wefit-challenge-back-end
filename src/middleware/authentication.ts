import { Request, Response, NextFunction } from 'express';

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'sua_chave_secreta';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken || authToken !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}
