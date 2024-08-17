import { Uuid } from 'core/shared/domain/Uuid';

export const uuid = () => new Uuid(crypto.randomUUID());
