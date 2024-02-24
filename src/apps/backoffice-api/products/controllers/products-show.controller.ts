import {Service} from 'diod'
import {Request, Response} from 'express'
import {ProductNotFoundError} from '../../../../contexts/core/product/domain/product-not-found.error'
import {Ok, neverHere} from '../../../../shared/utils'
import {ShowProductUseCase} from '../use-cases/show/show-product.use-case'
import {authenticated} from '../../shared/guards/authenticated.guard'

@Service()
export class ProductsShowController {
  constructor(private useCase: ShowProductUseCase) {}

  @authenticated()
  async run(req: Request, res: Response) {
    const result = await this.useCase.run(req.params.id)

    switch (true) {
      case result instanceof Ok:
        return res.status(201).send(result.value)

      case result instanceof ProductNotFoundError:
        return res.status(404).send()

      default:
        neverHere(result)
    }
  }
}
