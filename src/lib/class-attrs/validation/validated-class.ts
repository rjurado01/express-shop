import {Attr, METADATA_KEY} from '../constants'
import {AttrError, ConstraintError, ConstraintErrorCode} from './attr-error'
import {ClassValidationError} from './attr-error'
import {processAttr} from './process-attr'

export class ValidatedClass<T> {
  constructor(data: PartialProperties<T>) {
    this.assign(data, this.attrNames)
  }

  protected assign(data: PartialProperties<T>, keys: PropertyNames<T>[]) {
    const checkedKeys = keys.filter(item => this.attrNames.includes(item))
    let errors: AttrError[] = []

    if (data && typeof data !== 'object') {
      throw new ConstraintError(ConstraintErrorCode.NotInstance)
    } else {
      for (const key of checkedKeys) {
        const config = this.attrs[key]
        const value = data ? data[key] : undefined

        try {
          if (config.array) {
            if (!Array.isArray(value)) {
              throw new ConstraintError(ConstraintErrorCode.NotArray)
            }

            this.setValue(
              key,
              value.map((item, index) => {
                try {
                  return processAttr(item, config)
                } catch (err) {
                  errors = [...errors, ...this.processError(err, item, `${String(key)}.${index}`)]
                }
              }),
            )
          } else {
            this.setValue(key, processAttr(value, config))
          }
        } catch (err) {
          errors = [...errors, ...this.processError(err, value, String(key))]
        }
      }
    }

    if (errors.length > 0) {
      throw new ClassValidationError('Invalid...', errors)
    }
  }

  protected setValue(key: keyof T, val: any) {
    Object.assign(this, {[key]: val})
  }

  protected get attrs() {
    return Reflect.getMetadata(METADATA_KEY, this) as Record<keyof T, Attr>
  }

  protected get attrNames(): PropertyNames<T>[] {
    return Object.keys(this.attrs) as PropertyNames<T>[]
  }

  protected processError(err: unknown, value: unknown, keyPrefix: string): AttrError[] {
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
}
