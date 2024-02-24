import {IRouter} from 'express'
import {ProductCategoriesListController} from './controllers/product-categories-list.controller'
import {container} from '../di-container'

const productCategoriesRouter = {
  register: (router: IRouter) => {
    const listController = container.get(ProductCategoriesListController)

    router.get('/product-categories', listController.run.bind(listController))
  },
}

export {productCategoriesRouter}
