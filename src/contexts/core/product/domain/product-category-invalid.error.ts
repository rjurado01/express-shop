import {
  AttrError,
  ConstraintError,
  ConstraintErrorCode,
} from '../../../../lib/class-attrs/validation/attr-error'

export class ProductCategoryInvalidError extends AttrError {
  constructor(categoryId: string) {
    super('categoryId', categoryId, new ConstraintError(ConstraintErrorCode.IsInvalid))
  }
}
