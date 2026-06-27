import { Schema, z } from '@core/shared/schema';

export class Game extends Schema.define(
    z.object({
        id: z.uuid()
    })
) {}
