import z from 'zod';
export * as z from 'zod';

type ZodCtor<TSchema extends z.ZodTypeAny> = {
    new (input: z.input<TSchema>): z.infer<TSchema>;
    readonly schema: TSchema;
};

export abstract class Schema<TSchema extends z.ZodTypeAny> {
    static readonly schema: z.ZodTypeAny;

    constructor(input: z.input<TSchema>) {
        const ctor = this.constructor as ZodCtor<TSchema>;
        try {
            Object.assign(this, ctor.schema.parse(input));
        } catch (error) {
            if (error instanceof z.ZodError) {
                const exception = new Error(`Invalid ${ctor.name}: ${error.message}`);
                exception.cause = { error, input };
                exception.stack = error.stack;
                throw exception;
            }
            throw error;
        }
    }

    static define<TSchema extends z.ZodTypeAny>(schema: TSchema): ZodCtor<TSchema> {
        abstract class BaseModel extends Schema<TSchema> {
            static readonly schema = schema;
        }

        return BaseModel as unknown as ZodCtor<TSchema>;
    }
}
