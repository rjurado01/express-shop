import {Response} from 'express'
import jwt from 'jsonwebtoken'
import {CustomRequest, JWTUser} from '../../interfaces'

export function authenticated() {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (req: CustomRequest, res: Response) {
      if (process.env.SKIP_AUTH) return originalMethod.apply(this, [req, res])

      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({message: 'Authorization header is missing'})
      }

      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({message: 'Invalid token format'})
      }

      try {
        const jwtUser = jwt.verify(token, 'process.env.TOKEN_SECRET') as JWTUser
        req.user = jwtUser

        return originalMethod.apply(this, [req, res])
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({message: 'Invalid token'})
        } else if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({message: 'Token has expired'})
        }

        throw err
      }
    }
  }
}
