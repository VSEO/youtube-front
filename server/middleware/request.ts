import { Request, Response, NextFunction } from 'express'

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!/^\//.test(req.url)) {
    req.url = `${req.url}`.replace('//', '/')
  }
  next()
}

module.exports = {
  requestMiddleware
}

