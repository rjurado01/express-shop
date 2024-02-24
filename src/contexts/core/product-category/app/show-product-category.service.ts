import {injectable} from '../../../../shared/decorators/injectable'
import {Ok} from '../../../../shared/utils'
import {ProductCategoryNotFoundError} from '../domain/product-category-not-found.error'
import {ProductCategoryFilter} from '../domain/product-category.criteria'
import {ProductCategory} from '../domain/product-category.entity'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export interface ShowProductCategoryView extends Properties<ProductCategory> {}

@injectable()
export class ShowProductCategoryService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(
    filter: ProductCategoryFilter,
  ): Promise<Ok<ShowProductCategoryView> | ProductCategoryNotFoundError> {
    const category = await this.repository.findOne(filter)

    if (!category) return new ProductCategoryNotFoundError(filter)

    return new Ok(category)
  }
}
