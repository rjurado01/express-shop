import {Response} from 'express'

import {
  CreateProductDto,
  CreateProductService,
} from '../../../../contexts/core/product/app/create-product.service'

import {injectable} from '../../../../shared/decorators/injectable'
// import {authenticated} from '../guards/authenticated.guard'
import {InvalidClassError} from '../../../../lib/class-attrs/validation/attr-error'
import {Ok, neverHere} from '../../../../shared/utils'
import {CustomRequest} from '../../../web-api/interfaces'
import {authenticated} from '../../shared/guards/authenticated.guard'

@injectable()
export class ProductsCreateController {
  constructor(private service: CreateProductService) {}

  @authenticated()
  async run(req: CustomRequest, res: Response) {
    const body = req.body as Properties<CreateProductDto>
    const data: Properties<CreateProductDto> = {...body, photoPath: req.file?.path}
    const dto = new CreateProductDto(data)

    const result = await this.service.run(dto)

    switch (true) {
      case result instanceof Ok:
        return res.status(204)

      case result instanceof InvalidClassError:
        return res.status(422).send(result.errors)

      default:
        neverHere(result)
    }
  }
}
