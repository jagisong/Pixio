import { db } from '../config/db';

export const findUserByEmailOrUsername = async (identifier: string) => {
  const { rows } = await db.query(
    'SELECT * FROM users WHERE email = $1 OR username = $1 LIMIT 1',
    [identifier]
  );
  return rows[0];
};

export const createUser = async (username: string, email: string, password: string) => {
  await db.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, password]
  );
};
