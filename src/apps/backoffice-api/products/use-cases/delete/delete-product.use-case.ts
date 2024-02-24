import {Service} from 'diod'
import {DeleteProductService} from '../../../../../contexts/core/product/app/delete-product.service'
import {ProductNotFoundError} from '../../../../../contexts/core/product/domain/product-not-found.error'
import {Nothing, Ok} from '../../../../../shared/utils'

@Service()
export class ShowProductUseCase {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  async run(id: string): Promise<Ok<Nothing> | ProductNotFoundError> {
    return this.deleteProductService.run({id})
  }
}
