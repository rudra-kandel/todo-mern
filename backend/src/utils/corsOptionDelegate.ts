import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from './error';
import config from '@config/env.config';

const { allowedDomains } = config

const corsOptionsDelegate = (req: Request, callback: (err: Error | null, options?: any) => void) => {
  const host = req.headers.host;
  const origin = req.headers.origin ? req.headers.origin.split("://")[1] : host;
  if (!req.headers.origin) req.headers.origin = origin;

  console.log(origin, "Origin")
  if (allowedDomains.split(",").includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(
      new AppError(httpStatus.INTERNAL_SERVER_ERROR,
        "Domain not allowed. Please contact administration."
      ),
      { origin: false }
    );
  }
};

export default corsOptionsDelegate;
