import { AppError } from "./AppError";

export interface ErrorStrategy {
    handle(error: any): void;
}

export class DuplicateEntryErrorStrategy implements ErrorStrategy {
    handle(error: any): void {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError(`Conflict, this user already exists`, 409);
        }
    }
}