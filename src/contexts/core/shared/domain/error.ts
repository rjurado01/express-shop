export abstract class Error {
  constructor(readonly code: string, readonly info: object) {}
}
