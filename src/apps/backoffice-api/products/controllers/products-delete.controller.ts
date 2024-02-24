import {Request, Response} from 'express'

import {
  DeleteProductDto,
  DeleteProductService,
} from '../../../../contexts/core/product/app/delete-product.service'

import {injectable} from '../../../../shared/decorators/injectable'
import {ProductNotFoundError} from '../../../../contexts/core/product/domain/product-not-found.error'
import {Ok, neverHere} from '../../../../shared/utils'
import {authenticated} from '../../shared/guards/authenticated.guard'

@injectable()
export class ProductsDeleteController {
  constructor(private service: DeleteProductService) {}

  @authenticated()
  async run(req: Request, res: Response) {
    const dto = new DeleteProductDto({id: req.params.id})

    const result = await this.service.run(dto)

    switch (true) {
      case result instanceof Ok:
        return res.status(204).send()

      case result instanceof ProductNotFoundError:
        return res.status(404).send()

      default:
        neverHere(result)
    }
  }
}
