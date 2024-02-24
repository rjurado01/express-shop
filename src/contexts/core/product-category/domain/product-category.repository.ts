import {ProductCategory} from './product-category.entity'
import {ProductCategoryCriteria, ProductCategoryFilter} from './product-category.criteria'

export abstract class ProductCategoryRepository {
  abstract findAll(query?: ProductCategoryCriteria): Promise<ProductCategory[]>
  abstract findOne(filter?: ProductCategoryFilter): Promise<ProductCategory | null>
  abstract count(filter?: ProductCategoryFilter): Promise<number>
  abstract create(product: ProductCategory): Promise<void>
  abstract update(product: ProductCategory): Promise<void>
  abstract delete(product: ProductCategory): Promise<void>
  abstract clear(): Promise<void>
}
