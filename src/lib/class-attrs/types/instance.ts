import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'
import {CommonConfig} from './common'

export interface InstanceConfig extends CommonConfig {
  of: new (...args: any[]) => any
}

function checkPresence(val: any, config: InstanceConfig) {
  if ((val === undefined || val === null) && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any, _config: InstanceConfig) {
  // if (!(val instanceof config.of)) {
  if (typeof val !== 'object' || val === null) {
    throw new ConstraintError(ConstraintErrorCode.NotInstance)
  }
}

function cast(val: any, config: InstanceConfig) {
  if (!config.cast || val instanceof config.of) return val

  return new config.of(val)
}

export function processInstance(val: any, config: InstanceConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(newVal, config)

  return newVal
}

export function validateInstance(val: any, config: InstanceConfig): void {
  checkPresence(val, config)

  if (!val) return

  checkType(val, config)
}
