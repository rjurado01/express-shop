import {ClassConstructor} from '../../../types/global'

export enum ConstraintErrorCode {
  IsEmpty = 'IsEmpty',
  IsInvalid = 'IsInvalid',

  NotString = 'NotString',
  MaxLength = 'MaxLength',
  MinLength = 'MinLength',

  NotFloat = 'NotFloat',
  NotInteger = 'NotInteger',
  GreaterThanMax = 'GreaterThanMax',
  LessThanMin = 'LessThanMin',

  NotUuid = 'NotUuid',

  NotDate = 'NotDate',

  NotInstance = 'NotInstance',
  NotArray = 'NotArray',
  NotObject = 'NotObject',
}

export type ClassValidationErrors<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  -readonly [K in keyof T as T[K] extends Function ? never : K]?: T[K] extends Array<infer U>
    ? Record<number, ClassValidationErrors<U>>
    : T[K] extends object
    ? ClassValidationErrors<T[K]>
    : ConstraintError
}

export class InvalidClassError<T> {
  constructor(public readonly errors: ClassValidationErrors<T>) {}
}

export class ConstraintError {
  constructor(readonly code: ConstraintErrorCode, public info?: Record<string, any>) {}
}

export class AttrError {
  constructor(readonly path: string, readonly value: unknown, readonly error: ConstraintError) {}
}

export class ClassValidationError extends Error {
  readonly errors: AttrError[]

  constructor(msg: string, errors: AttrError[]) {
    super(msg)

    this.errors = errors
  }
}

export function hasErrors(errors: object) {
  return Object.keys(errors).length > 0
}

export class ClassValidation<T extends object> {
  readonly errors: AttrError[]
  readonly klass: ClassConstructor<T>

  constructor(klass: ClassConstructor<T>) {
    this.klass = klass
    this.errors = []
  }

  addError(error: AttrError) {
    this.errors.push(error)
  }

  addErrors(errors: AttrError[]) {
    errors.forEach(error => this.errors.push(error))
  }

  catchAttrError(err: unknown) {
    if (err instanceof AttrError) {
      this.addError(err)
    } else {
      throw err
    }
  }

  catchValidationError(err: unknown) {
    if (err instanceof ClassValidationError) {
      err.errors.forEach(this.addError)
    } else {
      throw err
    }
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  classValidationError() {
    return new ClassValidationError(`Invalid ${this.klass.name}`, this.errors)
  }

  ensureIsValid() {
    if (this.hasErrors()) throw this.classValidationError()
  }

  findError(path: string) {
    return this.errors.find(error => error.path === path)
  }
}
