type PropertyNames<T> = keyof {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T as T[P] extends Function ? never : P]: any
}

// type Attrs<Base> = Pick<Base, {
//   [Key in keyof Base]: Base[Key] extends () => unknown ? never : Key
// }[keyof Base]>

type PartialPropertyNames<T> = Partial<PropertyNames<T>>

type Properties<T> = Pick<T, PropertyNames<T>>

type PartialProperties<T> = Partial<Properties<T>>

type PickProperties<T, K extends PropertyNames<T>> = Pick<Properties<T>, K>
