import { ErrorStrategy } from './ErrorStrategy';

export class ErrorHandler {
  private strategy: ErrorStrategy;

  constructor(strategy: ErrorStrategy) {
    this.strategy = strategy;
  }

  handle(error: any): void {
    this.strategy.handle(error);
  }
}
