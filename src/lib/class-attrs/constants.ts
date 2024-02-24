export const enum AttrType {
  Uuid = 'Uuid',
  Integer = 'Integer',
  Float = 'Float',
  String = 'String',
  Instance = 'Instance',
  Date = 'Date',
  Enum = 'Enum',
}

export interface Attr extends Record<string, any> {
  type: AttrType
}

export const METADATA_KEY = 'attributes'
