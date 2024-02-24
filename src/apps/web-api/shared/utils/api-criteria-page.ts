import {isInteger} from '../../../../lib/class-attrs'

export class ApiCriteriaPage {
  @isInteger({min: 1, max: 200, optional: true, cast: true})
  size: number

  @isInteger({min: 1, max: 50, optional: true, cast: true})
  number: number

  constructor(data?: Properties<ApiCriteriaPage>) {
    // we received url number as strings
    this.size = parseInt(data?.size as unknown as string) || 50
    this.number = parseInt(data?.number as unknown as string) || 1
  }
}
