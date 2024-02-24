import {Service} from 'diod'
import {Request, Response} from 'express'
import {InvalidClassError} from '../../../../lib/class-attrs/validation/attr-error'
import {Ok, neverHere} from '../../../../shared/utils'
import {ListProductsUseCase} from '../use-cases/list/list-products.use-case'
import {ListProductsiUseCaseDto} from '../use-cases/list/list-products.use-case.dto'

@Service()
export class ProductsListController {
  constructor(private useCase: ListProductsUseCase) {}

  async run(req: Request, res: Response) {
    const query = new ListProductsiUseCaseDto(req.query)
    const result = await this.useCase.run(query)

    switch (true) {
      case result instanceof Ok:
        return res.status(200).send(result)

      case result instanceof InvalidClassError:
        return res.status(400).send(result.errors)

      default:
        neverHere(result)
    }
  }
}
