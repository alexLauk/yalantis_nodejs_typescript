import { Request, Response } from 'express';
import fs from 'fs';
import NotFoundError from '../errors/NotFoundError';

const getFile = async (req: Request, res: Response) => {
  const filePath = req.url.substr(1);

  try {
    const data = await fs.promises.readFile(filePath);

    return res.end(data);
  } catch (err) {
    throw new NotFoundError('File was not found');
  }
};

export default getFile;
