import {Service} from 'diod'

import {CreateProductService} from '../../../../../contexts/core/product/app/create-product.service'
import {InvalidClassError} from '../../../../../lib/class-attrs/validation/attr-error'
import {Nothing, Ok} from '../../../../../shared/utils'
import {CreateProductUseCaseDto} from './create-product.use-case.dto'

@Service()
export class CreateProductUseCase {
  constructor(private readonly service: CreateProductService) {}

  async run(
    data: CreateProductUseCaseDto,
  ): Promise<Ok<Nothing> | InvalidClassError<CreateProductUseCaseDto>> {
    const result = this.service.run(data)

    // other logic here

    return result
  }
}
