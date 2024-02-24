import {Service} from 'diod'

import {isFloat, isString, isUuid, ValidatedClass} from '../../../../lib/class-attrs'
import {ProductCategory} from '../domain/product-category.entity'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export class CreateProductCategoryDto extends ValidatedClass<CreateProductCategoryDto> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat()
  readonly price: number

  @isString()
  readonly description?: string
}

@Service()
export class CreateProductCategoryService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(data: CreateProductCategoryDto): Promise<void> {
    const product = new ProductCategory({...data, createdDate: new Date()})

    await this.repository.create(product)
  }
}
