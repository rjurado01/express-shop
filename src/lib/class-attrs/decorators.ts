import {AttrType, METADATA_KEY} from './constants'
import {DateConfig} from './types/date'
import {EnumConfig} from './types/enum'
import {FloatConfig} from './types/float'
import {InstanceConfig} from './types/instance'
import {IntegerConfig} from './types/integer'
import {StringConfig} from './types/string'
import {UuidConfig} from './types/uuid'

function attr(type: AttrType, options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {...options, type}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}

export function isInteger(config: IntegerConfig = {}) {
  return attr(AttrType.Integer, config)
}

export function isFloat(config: FloatConfig = {}) {
  return attr(AttrType.Float, config)
}

export function isDate(config: DateConfig = {}) {
  return attr(AttrType.Date, config)
}

export function isString(config: StringConfig = {}) {
  return attr(AttrType.String, config)
}

export function isUuid(config: UuidConfig = {}) {
  return attr(AttrType.Uuid, config)
}

export function isInstance(config: InstanceConfig) {
  return attr(AttrType.Instance, config)
}

export function isEnum(config: EnumConfig) {
  return attr(AttrType.Enum, config)
}
