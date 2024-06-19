import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Secret } from '../utils/config'

interface UserPayload {
  id: string
}

// Extender la interfaz Request de Express para añadir la propiedad userId
declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log('Cookies:', req.cookies);  // Log para ver las cookies
  // console.log('Cookie_Header_Middkeware:', req.headers.cookie);  // Log para ver las cookies
  const token = req.cookies.token as string;

  if (!token) {
    return res.status(403).json({ message: 'No existe el token' });
  }

  jwt.verify(token, Secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token Error !' });
    }

    req.userId = (user as UserPayload).id;
    next();
  });
}
