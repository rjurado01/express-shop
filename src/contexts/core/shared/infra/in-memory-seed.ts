import {ProductCategory} from '../../product-category/domain/product-category.entity'
import {Product} from '../../product/domain/product.entity'
import {User} from '../../user/domain/user.entity'

export const seedProductCategories = [
  '54bb6a25-e34c-48e0-814f-16617f3488e7',
  '2d6cdf44-a6b2-4686-a40d-8adf9f8d10b6',
  '08a8daf2-bb3a-4ba2-8cb0-225f2a4a54c8',
].map((id, n) =>
  ProductCategory.load({
    id,
    name: `ProductCategory ${n}`,
    description: `Descripción ${n}`,
    // TODO: productCount: 0,
    createdAt: new Date(),
  }),
)

export const seedProducts = [
  '42f3603b-50a2-4184-8d44-c6cc26bb488d',
  '48bd1b15-757f-4ee8-9687-1a513ce0b042',
  'd920930a-d752-4a78-98fa-c5c5ac2063b3',
  'c489a33c-3ce4-4b7a-8fc6-f722e57ab47d',
  '3249a38a-7047-494d-bb8b-8c0e98614590',
].map((id, n) =>
  Product.load({
    id,
    categoryId: seedProductCategories[Math.floor(Math.random() * 3)].id,
    name: `Product ${n}`,
    description: `El producto número ${n}`,
    price: parseFloat((Math.random() * 400).toFixed(2)),
    createdAt: new Date(),
  }),
)

export const seedUsers = ['0ba04dca-74fe-4c5c-af65-46c37a344937'].map((id, n) =>
  User.load({
    id,
    name: `User ${n}`,
    email: `user${n}@email.com`,
    createdAt: new Date(),
  }),
)
