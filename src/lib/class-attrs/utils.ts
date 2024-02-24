import {ProductFilter} from '../../contexts/core/product/domain/product.criteria'
import {ClassConstructor} from '../../types/global'
import {METADATA_KEY} from './constants'
import {AttrConfig} from './types/common'
import {
  AttrError,
  ClassValidationError,
  ClassValidationErrors,
  ConstraintError,
  ConstraintErrorCode,
  hasErrors,
} from './validation/attr-error'
import {validateAttr} from './validation/validate-attr'

export function validate<T extends object>(object: T): AttrError[] {
  const objectAttrs = instanceAttrs(object)
  const objectKeys = Object.keys(objectAttrs) as PropertyNames<T>[]

  let errors: AttrError[] = []

  for (const key of objectKeys) {
    const config = objectAttrs[key] as AttrConfig
    const value = object[key]

    const valueErrors = validateValue(value, String(key), config)

    if (valueErrors) errors = [...errors, ...valueErrors]
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

function instanceAttrs<T extends object>(instance: T) {
  return Reflect.getMetadata(METADATA_KEY, instance) as Record<keyof T, Attr>
}

function classAttrs<T extends object>(instance: ClassConstructor<T>) {
  return Reflect.getMetadata(METADATA_KEY, instance.prototype) as Record<keyof T, Attr>
}

// {
//   info: {code: 'invalid', info: {msg: 'welele'}},
//   age: {code: 'max', info: {max: 20}},
//   address: {
//     number: {code: 'notNumber'}
//   },
//   tags: [
//     {code: 'invalid', info: {index: 0}}
//   ],
//   users: [
//     {info: {index: 1, errors: {}}, code: 'invalid'}}
//   ]
// }

export function validate2<T extends object>(
  object: T,
  klass?: ClassConstructor<T>,
): ClassValidationErrors<T> {
  const objectAttrs = klass ? classAttrs(klass) : instanceAttrs(object)
  const objectKeys = Object.keys(objectAttrs) as PropertyNames<T>[]

  const errors: ClassValidationErrors<T> = {}

  for (const key of objectKeys) {
    const config = objectAttrs[key] as AttrConfig
    const value = object[key]

    const valueErrors = validateValue2(value, config)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (valueErrors) errors[key] = valueErrors
  }

  return errors
}

function validateValue2<K>(value: K, config: AttrConfig) {
  if (config.array) {
    if (!Array.isArray(value)) {
      return new ConstraintError(ConstraintErrorCode.NotArray)
    }

    const arrayErrors: Record<number, ConstraintError | ClassValidationErrors<unknown>> = {}

    value.forEach((item, index) => {
      const itemError = validateValue2(item, {...config, array: false})

      if (itemError) {
        arrayErrors[index] = itemError
      }
    })

    return arrayErrors
  } else {
    try {
      validateAttr(value, config)

      // check value for case when parameter is optional
      if ('of' in config && value) {
        const instanceErrors = validate2(value as object, config.of) // the before 'validateAttr' ensures it is an object

        return hasErrors(instanceErrors) ? instanceErrors : undefined
      }
    } catch (err) {
      if (err instanceof ConstraintError) {
        return err
      }

      throw err
    }
  }
}
