import {ClassValidationErrors} from '../../../../lib/class-attrs/validation/attr-error'
import {ProductCategory} from './product-category.entity'

export class ProductCategoryValidationError {
  constructor(public errors: ClassValidationErrors<ProductCategory>) {}
}
