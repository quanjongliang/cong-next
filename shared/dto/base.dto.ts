import { METHOD } from 'model/http';

export abstract class DTO {

    public abstract query: unknown;
    public abstract body: unknown;
    public abstract param?: unknown
    public abstract readonly url: string;
    public abstract readonly method: METHOD;
    public abstract readonly responseClass: new(...agrs: never[]) => unknown;
}

export class ResponseDTO<T> {
    constructor(public msgSts: {code: string, message: string}, public data: T) {
    }
}


export class EmptyResponse{}