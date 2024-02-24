import {Response} from 'express'
import {Request} from 'express'

export function authenticated() {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (req: Request, res: Response) {
      if (process.env.SKIP_AUTH) return originalMethod.apply(this, [req, res])

      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({message: 'Authorization header is missing'})
      }

      if (authHeader !== process.env.BACK_OFFICE_AUTH_TOKEN) {
        return res.status(401).json({message: 'Authorization token is invalid'})
      }

      return originalMethod.apply(this, [req, res])
    }
  }
}
