import {Service} from 'diod'
import {ListProductsService} from '../../../../../contexts/core/product/app/list-products.service'
import {ProductCriteria} from '../../../../../contexts/core/product/domain/product.criteria'
import {Ok} from '../../../../../shared/utils'
import {InvalidClassError, hasErrors} from '../../../../../lib/class-attrs/validation/attr-error'
import {validate2} from '../../../../../lib/class-attrs/utils'
import {ListProductsiUseCaseDto} from './list-products.use-case.dto'
import {ListProductsUseCaseView} from './list-products.use-case.view'

@Service()
export class ListProductsUseCase {
  constructor(private readonly listProductsService: ListProductsService) {}

  async run(
    dto: ListProductsiUseCaseDto,
  ): Promise<Ok<ListProductsUseCaseView> | InvalidClassError<ProductCriteria>> {
    const errors = validate2(dto)

    if (hasErrors(errors)) return new InvalidClassError(errors)

    return this.listProductsService.run(dto)
  }
}
