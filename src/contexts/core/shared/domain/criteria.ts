import {isInteger} from '../../../../lib/class-attrs'

export class CriteriaPage {
  @isInteger({min: 1, optional: true, cast: true})
  size?: number

  @isInteger({min: 1, optional: true, cast: true})
  number?: number

  constructor(data: Properties<CriteriaPage>) {
    this.size = data.size
    this.number = data.number
  }
}

export enum CriteriaOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Criteria {
  readonly filter?: unknown
  readonly order?: unknown
  readonly page?: unknown
}
