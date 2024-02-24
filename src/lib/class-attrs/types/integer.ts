import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'
import {CommonConfig} from './common'

export interface IntegerConfig extends CommonConfig {
  min?: number
  max?: number
}

function checkPresence(val: any, config: IntegerConfig) {
  if ((val === undefined || val === null) && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  if (typeof val !== 'number' || !Number.isInteger(val)) {
    throw new ConstraintError(ConstraintErrorCode.NotInteger)
  }
}

function checkMax(val: number, config: IntegerConfig) {
  if (config.max && val > config.max) {
    throw new ConstraintError(ConstraintErrorCode.GreaterThanMax)
  }
}

function checkMin(val: number, config: IntegerConfig) {
  if (config.min && val < config.min) {
    throw new ConstraintError(ConstraintErrorCode.LessThanMin)
  }
}

function cast(val: any, config: IntegerConfig) {
  if (!config.cast) return val

  const result = parseInt(val)

  return result || result === 0 ? result : val
}

export function processInteger(val: any, config: IntegerConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(newVal)
  checkMax(newVal, config)
  checkMin(newVal, config)

  return newVal
}

export function validateInteger(val: any, config: IntegerConfig): void {
  checkPresence(val, config)

  if (!val) return

  checkType(val)
  checkMax(val, config)
  checkMin(val, config)
}
