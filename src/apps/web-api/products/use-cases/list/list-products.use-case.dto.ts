import {ProductCriteria} from '../../../../../contexts/core/product/domain/product.criteria'
import {isInstance} from '../../../../../lib/class-attrs'
import {ApiCriteriaPage} from '../../../shared/utils/api-criteria-page'

export class ListProductsiUseCaseDto extends ProductCriteria {
  @isInstance({of: ApiCriteriaPage, optional: true})
  readonly page?: ApiCriteriaPage

  constructor(data: Properties<ListProductsiUseCaseDto>) {
    super(data)

    if (typeof data.page === 'object') {
      this.page = new ApiCriteriaPage(data.page)
    }
  }
}
