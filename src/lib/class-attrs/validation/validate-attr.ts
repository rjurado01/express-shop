import {AttrType} from '../constants'
import {validateDate} from '../types/date'
import {validateEnum} from '../types/enum'
import {validateFloat} from '../types/float'
import {validateInstance} from '../types/instance'
import {validateInteger} from '../types/integer'
import {validateString} from '../types/string'
import {validateUuid} from '../types/uuid'

export function validateAttr(value: any, config: any) {
  switch (config.type) {
    case AttrType.String:
      return validateString(value, config)

    case AttrType.Integer:
      return validateInteger(value, config)

    case AttrType.Float:
      return validateFloat(value, config)

    case AttrType.Uuid:
      return validateUuid(value, config)

    case AttrType.Instance:
      return validateInstance(value, config)

    case AttrType.Date:
      return validateDate(value, config)

    case AttrType.Date:
      return validateDate(value, config)

    case AttrType.Enum:
      return validateEnum(value, config)

    default:
      throw `Unknow AttrType: ${config.type}`
  }
}
