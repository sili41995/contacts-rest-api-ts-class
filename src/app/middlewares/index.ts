import isValidId from './isValidId';

type Middleware = typeof isValidId;

const middlewares = <Middleware[]>[isValidId];

export { middlewares };
