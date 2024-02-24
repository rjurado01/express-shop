import {isEnum, isFloat, isInstance, isString, isUuid} from '../../../../lib/class-attrs'
import {Criteria, CriteriaOrder, CriteriaPage} from '../../shared/domain/criteria'

export class ProductFilter {
  @isUuid({optional: true})
  id?: string

  @isFloat({optional: true, cast: true})
  priceLT?: number

  @isString({optional: true})
  search?: string

  constructor(data: Properties<ProductFilter>) {
    this.id = data.id
    this.priceLT = data.priceLT
    this.search = data.search
  }
}

export class ProductOrder {
  @isString()
  readonly field: string

  @isEnum({enum: CriteriaOrder, cast: true})
  readonly dir: CriteriaOrder

  constructor(data: Properties<ProductOrder>) {
    this.field = data.field
    this.dir = data.dir
  }
}

export class ProductCriteria implements Criteria {
  @isInstance({of: ProductFilter, optional: true, cast: true})
  readonly filter?: ProductFilter

  @isInstance({of: CriteriaPage, optional: true, cast: true})
  readonly page?: CriteriaPage

  @isInstance({of: ProductOrder, optional: true, cast: true})
  readonly order?: ProductOrder

  constructor(data: Properties<ProductCriteria>) {
    if (data.filter) this.filter = data.filter
    if (data.order) this.order = data.order
    if (data.page) this.page = data.page
  }
}
