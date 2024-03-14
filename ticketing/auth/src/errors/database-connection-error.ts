import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to Database';

    constructor() {
        super('Error connectin to Database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors = () => {
        return [
            { message: this.reason }
        ];
    }
}