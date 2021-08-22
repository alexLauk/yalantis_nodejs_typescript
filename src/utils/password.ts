import bcryptjs from 'bcryptjs';

export async function hashPassword(password: string) {
  const salt = bcryptjs.genSaltSync(10);
  const hashed = bcryptjs.hashSync(password, salt);
  return hashed;
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return bcryptjs.compare(password, hashedPassword);
}
