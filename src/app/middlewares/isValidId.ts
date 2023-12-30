import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { ApiError } from 'utils';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, {
      message: 'Validation failed',
      code: 'CONTACT_ID_VALIDATION_ERROR',
    });
  }

  console.log(req.params);
  next();
};

export default isValidId;
