import {Request, Response} from 'express'
import {injectable} from '../../../../shared/decorators/injectable'
import {
  CreateSessionUseCaseDto,
  CreateSessionError,
  CreateSessionUseCase,
} from '../use-cases/create-session.use-case'
import {Ok, neverHere} from '../../../../shared/utils'
import {InvalidClassError} from '../../../../lib/class-attrs/validation/attr-error'

@injectable()
export class SessionsCreateController {
  constructor(private readonly service: CreateSessionUseCase) {}

  // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
  async run(req: Request, res: Response) {
    const dto = new CreateSessionUseCaseDto(req.body)
    const result = await this.service.run(dto)

    switch (true) {
      case result instanceof Ok:
        return res.status(201).send(this.representation(result.value.jwt))

      case result instanceof InvalidClassError:
        return res.status(422).send(result.errors)

      case result instanceof CreateSessionError:
        return res.status(401).send()

      default:
        neverHere(result)
    }
  }

  private representation(jwt: string) {
    return {jwt}
  }
}
