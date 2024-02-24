import {Product} from './product.entity'
import {ProductCriteria, ProductFilter} from './product.criteria'

export abstract class ProductRepository {
  abstract findAll(query?: ProductCriteria): Promise<Product[]>
  abstract findOne(filter?: ProductFilter): Promise<Product | null>
  abstract count(filter?: ProductFilter): Promise<number>
  abstract create(product: Product): Promise<void>
  abstract update(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
  abstract clear(): Promise<void>
}
