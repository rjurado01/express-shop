import {IRouter} from 'express'
import {productsRouter} from './products/products.route'

export function registerBackOfficeApiRoutes(router: IRouter): void {
  productsRouter.register(router)
}
