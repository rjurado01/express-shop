import {Response} from 'express'

import {ShowUserService} from '../../../../contexts/core/user/app/show-user.service'
import {UserFilter} from '../../../../contexts/core/user/domain/user.criteria'

import {injectable} from '../../../../shared/decorators/injectable'
import {authenticated} from '../../shared/guards/authenticated.guard'
import {CustomRequest} from '../../interfaces'

@injectable()
export class ProfileShowController {
  constructor(private service: ShowUserService) {}

  @authenticated()
  async run(req: CustomRequest, res: Response) {
    if (!req.user) return res.status(401).send()

    const user = await this.service.run(new UserFilter({id: req.user.id}))

    if (!user) return res.status(401).send()

    res.status(200).send(user)
  }
}
