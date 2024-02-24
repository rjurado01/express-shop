import {Service} from 'diod'
import {ShowProductService} from '../../../../../contexts/core/product/app/show-product.service'
import {ProductNotFoundError} from '../../../../../contexts/core/product/domain/product-not-found.error'
import {Ok} from '../../../../../shared/utils'
import {ShowProductUseCaseView} from './show-product.use-case.view'

@Service()
export class ShowProductUseCase {
  constructor(private readonly showProductService: ShowProductService) {}

  async run(id: string): Promise<Ok<ShowProductUseCaseView> | ProductNotFoundError> {
    return this.showProductService.run({id})
  }
}
