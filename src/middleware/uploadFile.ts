import { Request } from 'express';
import multer from 'multer';
import BadRequestError from '../errors/BadRequestError';

const mimetypes = ['image/jpg', 'image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),

  filename: (req: Request, file: Express.Multer.File, cb: Function) => cb(null, file.originalname),
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (mimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
