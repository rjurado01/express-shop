import {IRouter} from 'express'
import {container} from '../di-container'
import {ProductsListController} from './controllers/products-list.controller'
import {ProductsShowController} from './controllers/products-show.controller'

const productsRouter = {
  register: (router: IRouter) => {
    const listController = container.get(ProductsListController)
    const showController = container.get(ProductsShowController)

    router.get('/products', listController.run.bind(listController))
    router.get('/products/:id', showController.run.bind(showController))
  },
}

export {productsRouter}
