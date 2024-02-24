import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'
import {CommonConfig} from './common'

export interface DateConfig extends CommonConfig {}

function checkPresence(val: any, config: DateConfig) {
  if (val !== undefined && val !== null) return true

  if (config.optional) return false

  throw new ConstraintError(ConstraintErrorCode.IsEmpty)
}

function checkType(val: any) {
  if (!(val instanceof Date) || isNaN(val.getTime())) {
    throw new ConstraintError(ConstraintErrorCode.NotDate)
  }
}

function cast(val: any, config: DateConfig) {
  if (!config.cast) return val

  // 1318250880000
  // 2011-10-10T14:48:00
  if (typeof val === 'number' || typeof val === 'string') return new Date(val)

  return val
}

export function processDate(val: any, config: DateConfig) {
  if (checkPresence(val, config)) {
    const newVal = cast(val, config)

    checkType(newVal)
  }
}

export function validateDate(val: any, config: DateConfig): void {
  if (checkPresence(val, config)) {
    checkType(val)
  }
}
