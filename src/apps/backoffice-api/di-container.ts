import {ContainerBuilder} from 'diod'

import {CreateProductService} from '../../contexts/core/product/app/create-product.service'
import {DeleteProductService} from '../../contexts/core/product/app/delete-product.service'
import {UpdateProductService} from '../../contexts/core/product/app/update-product.service'
import {ProductExternalServicesIntegration} from '../../contexts/core/product/domain/product-external-modules.integration'
import {ProductRepository} from '../../contexts/core/product/domain/product.repository'
import {ProductExternalServicesImportIntegration} from '../../contexts/core/product/infra/product-external-services-import.integration'
import {ProductInMemeoryRepository} from '../../contexts/core/product/infra/product-in-memery.repository'

import {ProductsCreateController} from './products/controllers/products-create.controller'
import {ProductsDeleteController} from './products/controllers/products-delete.controller'
import {ProductsUpdateController} from './products/controllers/products-update.controller'
import {ShowProductCategoryService} from '../../contexts/core/product-category/app/show-product-category.service'
import {ProductCategoryRepository} from '../../contexts/core/product-category/domain/product-category.repository'
import {ProductCategoryInMemeoryRepository} from '../../contexts/core/product-category/infra/product-category-in-memery.repository'
import {CreateProductUseCase} from './products/use-cases/create/create-product.use-case'
import {UpdateProductUseCase} from './products/use-cases/update/update-product.use-case'
import {ShowProductService} from '../../contexts/core/product/app/show-product.service'
import {ShowProductUseCase} from './products/use-cases/show/show-product.use-case'
import {ProductsShowController} from './products/controllers/products-show.controller'

function registerProductModule(builder: ContainerBuilder) {
  builder.register(ProductRepository).use(ProductInMemeoryRepository).asSingleton()
  builder
    .register(ProductExternalServicesIntegration)
    .use(ProductExternalServicesImportIntegration)
    .asSingleton()

  builder.registerAndUse(ShowProductService)
  builder.registerAndUse(CreateProductService)
  builder.registerAndUse(UpdateProductService)
  builder.registerAndUse(DeleteProductService)

  builder.registerAndUse(ShowProductUseCase)
  builder.registerAndUse(CreateProductUseCase)
  builder.registerAndUse(UpdateProductUseCase)

  builder.registerAndUse(ProductsShowController)
  builder.registerAndUse(ProductsCreateController)
  builder.registerAndUse(ProductsUpdateController)
  builder.registerAndUse(ProductsDeleteController)
}

function registerProductCategoryModule(builder: ContainerBuilder) {
  builder.register(ProductCategoryRepository).use(ProductCategoryInMemeoryRepository).asSingleton()

  builder.registerAndUse(ShowProductCategoryService)
}

const builder = new ContainerBuilder()

registerProductModule(builder)
registerProductCategoryModule(builder)

const container = builder.build()

export {container}
