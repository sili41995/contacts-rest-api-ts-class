import { Document } from 'mongoose';

const cleanObject = <T>(
  content:
    | (Document<unknown, {}, T> &
        T &
        Required<{
          _id: string;
        }>)[]
    | (Document<unknown, {}, T> &
        T &
        Required<{
          _id: string;
        }>)
): T | T[] => {
  if (Array.isArray(content)) {
    return content.map((doc: Document) => doc.toObject());
  }

  return content.toObject();
};

export default cleanObject;
