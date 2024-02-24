import {Service} from 'diod'

import {UpdateProductService} from '../../../../../contexts/core/product/app/update-product.service'
import {ProductNotFoundError} from '../../../../../contexts/core/product/domain/product-not-found.error'
import {InvalidClassError} from '../../../../../lib/class-attrs/validation/attr-error'
import {Nothing, Ok} from '../../../../../shared/utils'
import {UpdateProductUseCaseDto} from './update-product.use-case.dto'

@Service()
export class UpdateProductUseCase {
  constructor(private readonly service: UpdateProductService) {}

  async run(
    data: UpdateProductUseCaseDto,
  ): Promise<Ok<Nothing> | InvalidClassError<UpdateProductUseCaseDto> | ProductNotFoundError> {
    const result = this.service.run(data)

    // other logic here

    return result
  }
}
