import {METADATA_KEY} from './constants'
import {AttrConfig} from './types/common'
import {
  AttrError,
  ClassValidationError,
  ClassValidationErrors,
  ConstraintError,
  ConstraintErrorCode,
} from './validation/attr-error'
import {validateAttr} from './validation/validate-attr'

export function validate<T extends object>(object: T): ClassValidationErrors<T> {
  const objectAttrs = attrs(object)
  const objectKeys = Object.keys(objectAttrs) as []

  const errors: ClassValidationErrors<T>

  for (const key of objectKeys) {
    const config = objectAttrs[key] as AttrConfig
    const value = object[key]

    const valueErrors = validateValue(value, String(key), config)

    if (valueErrors) errors[key] = valueErrors
  }

  return errors
}

function validateValue(value: unknown, key: string, config: AttrConfig): AttrError[] | undefined {
  if (config.array) {
    if (!Array.isArray(value)) {
      return [new AttrError(key, value, new ConstraintError(ConstraintErrorCode.NotArray))]
    }

    value.forEach((item, index) => {
      try {
        validateAttr(item, config)
      } catch (err) {
        return processError(err, value, `${key}.${index}`)
      }
    })
  } else {
    try {
      validateAttr(value, config)
    } catch (err) {
      return processError(err, value, key)
    }
  }
}

function processError(err: unknown, value: unknown, keyPrefix: string): AttrError[] {
  if (err instanceof ClassValidationError) {
    return err.errors.map(nestedError => {
      return {
        ...nestedError,
        path: `${String(keyPrefix)}.${nestedError.path}`,
      }
    })
  } else if (err instanceof ConstraintError) {
    return [new AttrError(String(keyPrefix), value, err)]
  } else {
    throw err
  }
}

function attrs<T extends object>(instance: T) {
  return Reflect.getMetadata(METADATA_KEY, instance) as Record<keyof T, Attr>
}
