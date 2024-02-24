import {App} from '@deepkit/app'
import {createTestingApp, TestingFacade} from '@deepkit/framework'
import {HttpRequest} from '@deepkit/http'
import {provide} from '@deepkit/injector'
import {expect, test} from '@jest/globals'
import {randomUUID} from 'crypto'
import {ProductsListController} from '../../../src/apps/web-api/controllers/products-list.controller'
import {ListProductsService} from '../../../src/core/products/app/list-products.service'
import {ProductRepository} from '../../../src/core/products/domain/product.repository'
import {ProductInMemeoryRepository} from '../../../src/core/products/infra/product-in-memery.repository'
// import {BlinkDbClient} from '../../../src/core/shared/infra/blink-db-client'

describe('ProductsListController', () => {
  let testing: TestingFacade<any>
  let repository: ProductRepository
  let dbClient: BlinkDbClient

  beforeAll(async () => {
    console.time()
    testing = createTestingApp({})
    await testing.startServer()
    console.timeEnd()

    const app: App<any> = testing.app

    repository = app.get<ProductRepository>()
    dbClient = app.get(BlinkDbClient)
  })
 
  beforeEach(async () => {
    dbClient.clear()
  })

  afterAll(async () => {
    await testing.stopServer()
  })

  test('returns 200 http status and correct result', async () => {
    const products = [
      {id: randomUUID(), name: 'P1', price: 12.50},
      {id: randomUUID(), name: 'P2', price: 2},
    ]

    await repository.create(products[0])
    await repository.create(products[1])

    const response = await testing.request(HttpRequest.GET('/products'))
    expect(response.statusCode).toBe(200)
    expect(response.json.data).toEqual(expect.arrayContaining(products))
  })

  test('returns 200 http status and correct result', async () => {
    const products = [
      {id: randomUUID(), name: 'P1', price: 12.50},
      {id: randomUUID(), name: 'P2', price: 2},
    ]

    await repository.create(products[0])
    await repository.create(products[1])

    const response = await testing.request(HttpRequest.GET('/products?filter[search]=P1'))
    expect(response.statusCode).toBe(200)
    expect(response.json.data).toEqual(expect.arrayContaining(products.slice(0,1)))
  })
})

