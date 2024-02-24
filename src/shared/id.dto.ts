import {isUuid} from '../lib/class-attrs'

export class IdDto {
  @isUuid()
  readonly id: string

  constructor(data: {id: string}) {
    this.id = data.id
  }
}
