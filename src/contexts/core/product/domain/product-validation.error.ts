import {ClassValidationErrors} from '../../../../lib/class-attrs/validation/attr-error'
import {Product} from './product.entity'

export class ProductValidationError {
  constructor(public errors: ClassValidationErrors<Product>) {}
}
