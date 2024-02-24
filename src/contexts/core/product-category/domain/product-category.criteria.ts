import {
  isEnum,
  isFloat,
  isInstance,
  isString,
  isUuid,
  ValidatedClass,
} from '../../../../lib/class-attrs'
import {Criteria, CriteriaOrder, CriteriaPage} from '../../shared/domain/criteria'

export class ProductCategoryFilter extends ValidatedClass<ProductCategoryFilter> {
  @isUuid({optional: true})
  readonly id?: string

  @isFloat({optional: true, cast: true})
  readonly priceLT: number

  @isString({optional: true})
  readonly search?: string
}

export class ProductCategoryOrder extends ValidatedClass<ProductCategoryFilter> {
  @isString()
  readonly field: string

  @isEnum({enum: CriteriaOrder, cast: true})
  readonly dir: CriteriaOrder
}

export class ProductCategoryCriteria implements Criteria {
  @isInstance({of: ProductCategoryFilter, optional: true, cast: true})
  readonly filter?: ProductCategoryFilter

  @isInstance({of: CriteriaPage, optional: true, cast: true})
  readonly page?: CriteriaPage

  @isInstance({of: ProductCategoryOrder, optional: true, cast: true})
  readonly order?: ProductCategoryOrder

  constructor(data: Properties<ProductCategoryCriteria>) {
    if (data.filter) this.filter = new ProductCategoryFilter(data.filter)
    if (data.order) this.order = new ProductCategoryOrder({}) // TODO
    if (data.page) this.page = new CriteriaPage(data.page)
  }
}
