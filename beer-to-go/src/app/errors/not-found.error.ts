export class NotFoundError extends Error {
  constructor(entity: string, reason: string = 'não encontrado') {
    super(`${entity} ${reason}`);
    this.name = 'NotFoundError';
  }
}
