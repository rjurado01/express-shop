import {injectable} from '../../../../shared/decorators/injectable'
import {Ok} from '../../../../shared/utils'
import {ShowProductCategoryService} from '../../product-category/app/show-product-category.service'
import {ProductCategoryFilter} from '../../product-category/domain/product-category.criteria'
import {ProductExternalServicesIntegration} from '../domain/product-external-modules.integration'

@injectable()
export class ProductExternalServicesImportIntegration
  implements ProductExternalServicesIntegration
{
  constructor(private readonly showProductCategoryService: ShowProductCategoryService) {}

  async existProductCategory(categoryId: string): Promise<boolean> {
    const result = await this.showProductCategoryService.run(
      new ProductCategoryFilter({id: categoryId}),
    )

    return result instanceof Ok
  }
}
