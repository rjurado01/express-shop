import {Service} from 'diod'
import {Request, Response} from 'express'
import {ListProductCategoriesService} from '../../../../contexts/core/product-category/app/list-product-categories.service'
import {ProductCategoryCriteria} from '../../../../contexts/core/product-category/domain/product-category.criteria'

@Service()
export class ProductCategoriesListController {
  constructor(private service: ListProductCategoriesService) {}

  async run(req: Request, res: Response) {
    const query = new ProductCategoryCriteria(req.query)
    const result = await this.service.run(query)

    res.send(result)
  }
}
