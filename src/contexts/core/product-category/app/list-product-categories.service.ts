import {Service} from 'diod'
import {omit} from '../../../../lib/utils'
import {ProductCategoryCriteria} from '../domain/product-category.criteria'
import {ProductCategory} from '../domain/product-category.entity'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export interface ListProductCategorysView {
  data: Omit<Properties<ProductCategory>, 'description'>[]
  meta: {
    totalElements: number
  }
}

@Service()
export class ListProductCategoriesService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(query: ProductCategoryCriteria): Promise<ListProductCategorysView> {
    const data = await this.repository.findAll(query)
    const count = await this.repository.count(query.filter)

    return {
      data: data.map(this.mapProductCategoryToView),
      meta: {totalElements: count},
    }
  }

  private mapProductCategoryToView(category: ProductCategory) {
    return omit(category, ['description'])
  }
}
