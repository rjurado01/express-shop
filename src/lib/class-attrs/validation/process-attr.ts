import {AttrType} from '../constants'
import {processDate} from '../types/date'
import {processEnum} from '../types/enum'
import {processFloat} from '../types/float'
import {processInstance} from '../types/instance'
import {processInteger} from '../types/integer'
import {processString} from '../types/string'
import {processUuid} from '../types/uuid'

export function processAttr(value: any, config: any) {
  switch (config.type) {
    case AttrType.String:
      return processString(value, config)

    case AttrType.Integer:
      return processInteger(value, config)

    case AttrType.Float:
      return processFloat(value, config)

    case AttrType.Uuid:
      return processUuid(value, config)

    case AttrType.Instance:
      return processInstance(value, config)

    case AttrType.Date:
      return processDate(value, config)

    case AttrType.Date:
      return processDate(value, config)

    case AttrType.Enum:
      return processEnum(value, config)

    default:
      throw `Unknow AttrType: ${config.type}`
  }
}
