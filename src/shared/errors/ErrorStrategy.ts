import { AppError } from "./AppError";

export interface ErrorStrategy {
    handle(error: any): void;
}

export class DuplicateEntryErrorStrategy implements ErrorStrategy {
    handle(error: any): void {
        if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('unique_document', 'unique_email')) {
            throw new AppError(`Document or Email must be unique`, 409);
        }
    }
}