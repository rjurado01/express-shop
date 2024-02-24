import {Service} from 'diod'
import jwt from 'jsonwebtoken'
import {ShowUserService} from '../../../../contexts/core/user/app/show-user.service'
import {UserNotFoundError} from '../../../../contexts/core/user/domain/user-not-found.error'
import {UserFilter} from '../../../../contexts/core/user/domain/user.criteria'
import {isString} from '../../../../lib/class-attrs'
import {Ok} from '../../../../shared/utils'
import {validate2} from '../../../../lib/class-attrs/utils'
import {InvalidClassError, hasErrors} from '../../../../lib/class-attrs/validation/attr-error'

export class CreateSessionUseCaseDto {
  @isString()
  email: string

  @isString()
  password: string

  constructor(data: Properties<CreateSessionUseCaseDto>) {
    this.email = data.email
    this.password = data.password
  }
}

type CreateSessionUseCaseView = {jwt: string}

export class CreateSessionError extends Error {}

@Service()
export class CreateSessionUseCase {
  constructor(private readonly showUserService: ShowUserService) {}

  async run(
    dto: CreateSessionUseCaseDto,
  ): Promise<
    Ok<CreateSessionUseCaseView> | InvalidClassError<CreateSessionUseCaseDto> | CreateSessionError
  > {
    const validation = validate2(dto, CreateSessionUseCaseDto)

    if (hasErrors(validation)) return new InvalidClassError(validation)

    const filter = new UserFilter({email: dto.email})
    const user = await this.showUserService.run(filter)

    if (user instanceof UserNotFoundError) return new CreateSessionError()

    const jwt = this.generateAccessToken({id: user.id})

    return new Ok({jwt})
  }

  private generateAccessToken(payload: {id: string}): string {
    // TODO: coger el token de un objeto config
    return jwt.sign(payload, 'process.env.TOKEN_SECRET', {expiresIn: '3600s'})
  }
}
