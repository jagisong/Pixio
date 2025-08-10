import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmailOrUsername, createUser } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  const existing = await findUserByEmailOrUsername(email) || await findUserByEmailOrUsername(username);
  if (existing) return res.status(409).json({ message: 'User already exists.' });

  const hash = await bcrypt.hash(password, 10);
  await createUser(username, email, hash);

  res.status(201).json({ message: 'Signup successful, you can now login.' });
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  if (!identifier || !password)
    return res.status(400).json({ message: 'Both fields are required.' });

  const user = await findUserByEmailOrUsername(identifier);
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
};
