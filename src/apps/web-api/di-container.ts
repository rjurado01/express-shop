import {ContainerBuilder} from 'diod'
import {ListProductCategoriesService} from '../../contexts/core/product-category/app/list-product-categories.service'
import {ShowProductCategoryService} from '../../contexts/core/product-category/app/show-product-category.service'
import {ProductCategoryRepository} from '../../contexts/core/product-category/domain/product-category.repository'
import {ProductCategoryInMemeoryRepository} from '../../contexts/core/product-category/infra/product-category-in-memery.repository'
import {ListProductsService} from '../../contexts/core/product/app/list-products.service'
import {ShowProductService} from '../../contexts/core/product/app/show-product.service'
import {ProductExternalServicesIntegration} from '../../contexts/core/product/domain/product-external-modules.integration'
import {ProductRepository} from '../../contexts/core/product/domain/product.repository'
import {ProductExternalServicesImportIntegration} from '../../contexts/core/product/infra/product-external-services-import.integration'
import {ProductInMemeoryRepository} from '../../contexts/core/product/infra/product-in-memery.repository'
import {ShowUserService} from '../../contexts/core/user/app/show-user.service'
import {UserRepository} from '../../contexts/core/user/domain/user.repository'
import {UserInMemeoryRepository} from '../../contexts/core/user/infra/user-in-memery.repository'
import {ProfileShowController} from './auth/controllers/profile-show.controller'
import {SessionsCreateController} from './auth/controllers/sessions-create.controller'
import {CreateSessionUseCase} from './auth/use-cases/create-session.use-case'
import {ProductCategoriesListController} from './product-categories/controllers/product-categories-list.controller'
import {ProductsListController} from './products/controllers/products-list.controller'
import {ProductsShowController} from './products/controllers/products-show.controller'
import {ListProductsUseCase} from './products/use-cases/list/list-products.use-case'
import {StatsShowController} from './stats/controllers/stats-show.controller'
import {ShowStatsService} from './stats/use-cases/show/show-stats.use-case'
import {ShowProductUseCase} from './products/use-cases/show/show-product.use-case'

function registerProductModule(builder: ContainerBuilder) {
  builder.register(ProductRepository).use(ProductInMemeoryRepository).asSingleton()
  builder
    .register(ProductExternalServicesIntegration)
    .use(ProductExternalServicesImportIntegration)
    .asSingleton()

  builder.registerAndUse(ListProductsService)
  builder.registerAndUse(ShowProductService)

  builder.registerAndUse(ListProductsUseCase)
  builder.registerAndUse(ShowProductUseCase)

  builder.registerAndUse(ProductsListController)
  builder.registerAndUse(ProductsShowController)
}

function registerProductCategoryModule(builder: ContainerBuilder) {
  builder.register(ProductCategoryRepository).use(ProductCategoryInMemeoryRepository).asSingleton()

  builder.registerAndUse(ShowProductCategoryService)
  builder.registerAndUse(ListProductCategoriesService)

  builder.registerAndUse(ProductCategoriesListController)
}

function registerUserModule(builder: ContainerBuilder) {
  builder.register(UserRepository).use(UserInMemeoryRepository).asSingleton()

  builder.registerAndUse(ShowUserService)
}

function registerAuthModule(builder: ContainerBuilder) {
  builder.registerAndUse(CreateSessionUseCase)

  builder.registerAndUse(SessionsCreateController)
  builder.registerAndUse(ProfileShowController)
}

function registerGeneralModule(builder: ContainerBuilder) {
  builder.registerAndUse(ShowStatsService)
  builder.registerAndUse(StatsShowController)
}

const builder = new ContainerBuilder()

registerProductModule(builder)
registerProductCategoryModule(builder)
registerUserModule(builder)
registerAuthModule(builder)
registerGeneralModule(builder)

const container = builder.build()

export {container}
