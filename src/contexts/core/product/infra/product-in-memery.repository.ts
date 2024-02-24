import {injectable} from '../../../../shared/decorators/injectable'
import {seedProducts} from '../../shared/infra/in-memory-seed'
import {InMemoryRepository} from '../../shared/infra/in-memory.repository'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {ProductCriteria, ProductFilter} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

@injectable()
export class ProductInMemeoryRepository
  extends InMemoryRepository<Product, ProductCriteria>
  implements ProductRepository
{
  constructor() {
    super()

    this.items = seedProducts
  }

  protected applyFilter(filter: ProductFilter, products: Product[]) {
    return products.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const search =
        !filter?.search || item.name.toLowerCase().includes(filter.search.toLowerCase())

      const priceLT = !filter?.priceLT || item.price < filter.priceLT

      return id && search && priceLT
    })
  }

  protected notFound(filter: ProductFilter) {
    throw new ProductNotFoundError(filter)
  }
}
