export class Uuid extends String {
    constructor(value: string) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) {
            throw new Error('Invalid Uuid');
        }
        super(value);
    }
}
