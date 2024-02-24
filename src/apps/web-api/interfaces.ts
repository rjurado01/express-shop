import {Request} from 'express'

export interface JWTUser {
  id: string
  email: string
}

export interface CustomRequest extends Request {
  user?: JWTUser
}
