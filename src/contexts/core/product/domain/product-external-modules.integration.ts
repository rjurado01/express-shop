export abstract class ProductExternalServicesIntegration {
  abstract existProductCategory(categoryId: string): Promise<boolean>
}
