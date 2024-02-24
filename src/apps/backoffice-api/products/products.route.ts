import {IRouter} from 'express'
import {ProductsCreateController} from '../../backoffice-api/products/controllers/products-create.controller'
import {ProductsDeleteController} from '../../backoffice-api/products/controllers/products-delete.controller'
import {ProductsUpdateController} from '../../backoffice-api/products/controllers/products-update.controller'
import {upload} from '../../shared/services/upload'
import {container} from '../di-container'
import {ProductsShowController} from './controllers/products-show.controller'

const productsRouter = {
  register: (router: IRouter) => {
    const showController = container.get(ProductsShowController)
    const createController = container.get(ProductsCreateController)
    const updateController = container.get(ProductsUpdateController)
    const deleteController = container.get(ProductsDeleteController)

    router.get('/products/:id', showController.run.bind(showController))
    router.post('/products', upload.single('photo'), createController.run.bind(createController))
    router.put('/products/:id', updateController.run.bind(updateController))
    router.delete('/products/:id', deleteController.run.bind(deleteController))
  },
}

export {productsRouter}
