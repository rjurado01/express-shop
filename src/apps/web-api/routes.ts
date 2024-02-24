import {IRouter} from 'express'
import {authRouter} from './auth/auth.route'
import {productCategoriesRouter} from './product-categories/product-categories.route'
import {productsRouter} from './products/products.route'
import {generalRouter} from './stats/stats.route'

export function registerWebApiRoutes(router: IRouter): void {
  productsRouter.register(router)
  productCategoriesRouter.register(router)
  authRouter.register(router)
  generalRouter.register(router)
}
