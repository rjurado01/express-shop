import {DateConfig} from './date'
import {EnumConfig} from './enum'
import {FloatConfig} from './float'
import {InstanceConfig} from './instance'
import {IntegerConfig} from './integer'
import {StringConfig} from './string'
import {UuidConfig} from './uuid'

export interface CommonConfig {
  optional?: boolean
  array?: boolean
  cast?: boolean
}

export type AttrConfig =
  | StringConfig
  | UuidConfig
  | IntegerConfig
  | InstanceConfig
  | FloatConfig
  | EnumConfig
  | DateConfig
