import {Service} from 'diod'
import {ListProductsService} from '../../../../../contexts/core/product/app/list-products.service'
import {ProductCriteria} from '../../../../../contexts/core/product/domain/product.criteria'
import {CriteriaPage} from '../../../../../contexts/core/shared/domain/criteria'
import {InvalidClassError} from '../../../../../lib/class-attrs/validation/attr-error'
import {Ok, neverHere} from '../../../../../shared/utils'
import {ShowStatsUseCaseView} from './show-stats.use-case.view'

export interface ShowStatsView {
  productsCount: number
  usersCount: number
}

@Service()
export class ShowStatsService {
  constructor(private readonly listProductsService: ListProductsService) {}

  async run(): Promise<ShowStatsUseCaseView> {
    const productsCriteria = new ProductCriteria({page: new CriteriaPage({size: 1, number: 1})})

    const productsResult = await this.listProductsService.run(productsCriteria)

    switch (true) {
      case productsResult instanceof Ok:
        break

      case productsResult instanceof InvalidClassError:
        throw productsResult // TODO

      default:
        neverHere(productsResult)
    }

    return {
      productsCount: productsResult.value.meta.totalElements,
    }
  }
}
