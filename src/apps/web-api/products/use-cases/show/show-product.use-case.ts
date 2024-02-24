import {Service} from 'diod'
import {ProductNotFoundError} from '../../../../../contexts/core/product/domain/product-not-found.error'
import {Ok} from '../../../../../shared/utils'
import {
  ShowProductService,
  ShowProductView,
} from '../../../../../contexts/core/product/app/show-product.service'
import {ShowProductUseCaseView} from './show-product.use-case.view'
import {omit} from '../../../../../lib/utils'
import {ShowProductUseCaseDto} from './show-product.use-case.dto'

@Service()
export class ShowProductUseCase {
  constructor(private readonly showProductService: ShowProductService) {}

  async run(
    dto: ShowProductUseCaseDto,
  ): Promise<Ok<ShowProductUseCaseView> | ProductNotFoundError> {
    const result = await this.showProductService.run(dto)

    switch (true) {
      case result instanceof Ok:
        return new Ok(this.mapProduct(result.value))

      default:
        return result
    }
  }

  private mapProduct(product: ShowProductView): ShowProductUseCaseView {
    return omit(product, ['createdAt'])
  }
}
