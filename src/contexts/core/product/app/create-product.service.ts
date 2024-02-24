import {
  ClassValidationErrors,
  ConstraintError,
  ConstraintErrorCode,
  InvalidClassError,
  hasErrors,
} from '../../../../lib/class-attrs/validation/attr-error'
import {injectable} from '../../../../shared/decorators/injectable'
import {Nothing, Ok, neverHere} from '../../../../shared/utils'
import {ProductExternalServicesIntegration} from '../domain/product-external-modules.integration'
import {ProductValidationError} from '../domain/product-validation.error'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

export class CreateProductDto {
  readonly id: string
  readonly categoryId: string
  readonly name: string
  readonly price: number
  readonly info?: string // has diferent name of entity
  readonly photoPath?: string

  constructor(data: Properties<CreateProductDto>) {
    this.id = data.id
    this.categoryId = data.categoryId
    this.name = data.name
    this.price = data.price
    this.info = data.info
    this.photoPath = data.photoPath
  }
}

@injectable()
export class CreateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly externalServices: ProductExternalServicesIntegration,
  ) {}

  async run(data: CreateProductDto): Promise<Ok<Nothing> | InvalidClassError<CreateProductDto>> {
    const dtoErrors: ClassValidationErrors<CreateProductDto> = {}

    const product = Product.create({...data, description: data.info})

    switch (true) {
      case product instanceof Product:
        break

      case product instanceof ProductValidationError:
        this.copyErrors(dtoErrors, product.errors)
        break

      default:
        neverHere(product)
    }

    await this.checkCategoryIdExists(data.categoryId, dtoErrors)

    if (hasErrors(dtoErrors)) return new InvalidClassError<CreateProductDto>(dtoErrors)

    await this.repository.create(product as Product)

    return new Ok(Nothing)
  }

  private async checkCategoryIdExists(
    value: string,
    dtoErrors: ClassValidationErrors<CreateProductDto>,
  ) {
    if (dtoErrors.categoryId) return

    const existProduct = await this.externalServices.existProductCategory(value)

    if (!existProduct) {
      dtoErrors.categoryId = new ConstraintError(ConstraintErrorCode.IsInvalid)
    }
  }

  private copyErrors(
    dtoErrors: ClassValidationErrors<CreateProductDto>,
    productErrors: ClassValidationErrors<Product>,
  ) {
    dtoErrors.id = productErrors.id
    dtoErrors.categoryId = productErrors.categoryId
    dtoErrors.name = productErrors.name
    dtoErrors.price = productErrors.price
    dtoErrors.info = productErrors.description // change the name
    dtoErrors.photoPath = productErrors.photoPath
  }
}
