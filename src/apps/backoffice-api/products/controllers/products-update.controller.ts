import {Request, Response} from 'express'

import {ProductNotFoundError} from '../../../../contexts/core/product/domain/product-not-found.error'
import {InvalidClassError} from '../../../../lib/class-attrs/validation/attr-error'
import {injectable} from '../../../../shared/decorators/injectable'
import {Ok, neverHere} from '../../../../shared/utils'
import {UpdateProductUseCaseDto} from '../use-cases/update/update-product.use-case.dto'
import {UpdateProductUseCase} from '../use-cases/update/update-product.use-case'
import {authenticated} from '../../shared/guards/authenticated.guard'

@injectable()
export class ProductsUpdateController {
  constructor(private useCase: UpdateProductUseCase) {}

  @authenticated()
  async run(req: Request, res: Response) {
    const dto = new UpdateProductUseCaseDto({...req.body, id: req.params.id})

    const result = await this.useCase.run(dto)

    switch (true) {
      case result instanceof Ok:
        return res.status(204)

      case result instanceof ProductNotFoundError:
        return res.status(404)

      case result instanceof InvalidClassError:
        return res.status(422).send(result.errors)

      default:
        neverHere(result)
    }
  }
}
