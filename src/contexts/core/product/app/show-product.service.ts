import {Service} from 'diod'
import {Ok} from '../../../../shared/utils'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'
import {ProductFilter} from '../domain/product.criteria'
import {IdDto} from '../../../../shared/id.dto'

export interface ShowProductView extends Properties<Product> {}

export class ShowProductDto extends IdDto {}

@Service()
export class ShowProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(dto: ShowProductDto): Promise<Ok<ShowProductView> | ProductNotFoundError> {
    const filter = new ProductFilter({id: dto.id})
    const product = await this.repository.findOne(filter)

    if (!product) return new ProductNotFoundError(filter)

    return new Ok(product)
  }
}
