import {Service} from 'diod'

import {isUuid, ValidatedClass} from '../../../../lib/class-attrs'
import {ProductCategoryFilter} from '../domain/product-category.criteria'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export class DeleteProductCategoryDto extends ValidatedClass<DeleteProductCategoryDto> {
  @isUuid()
  readonly id: string
}

@Service()
export class DeleteProductCategoryService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(data: DeleteProductCategoryDto): Promise<void> {
    const filter = new ProductCategoryFilter({id: data.id})
    const product = await this.repository.findOne(filter)

    await this.repository.delete(product)
  }
}
