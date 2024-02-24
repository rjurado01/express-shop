import {Service} from 'diod'

import {isFloat, isString, isUuid, ValidatedClass} from '../../../../lib/class-attrs'
import {ProductCategoryFilter} from '../domain/product-category.criteria'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export class UpdateProductCategoryDto extends ValidatedClass<UpdateProductCategoryDto> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat({cast: true})
  readonly price: number

  @isString()
  readonly description?: string
}

@Service()
export class UpdateProductCategoryService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(data: UpdateProductCategoryDto): Promise<void> {
    const {id, ...updateData} = data
    const filter = new ProductCategoryFilter({id})
    const productCategory = await this.repository.findOne(filter)

    productCategory.update(updateData)

    await this.repository.update(productCategory)
  }
}
