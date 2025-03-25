
export class ApiError extends Error {
    constructor(
        statusCode,
        error,
        stack
    ){
        super();
        this.statusCode = statusCode;
        this.error = error;
        if(this.stack){
            this.stack = stack;
        }
    }
}