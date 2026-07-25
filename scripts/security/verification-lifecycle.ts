export class FailureCollector {
  private readonly failures: unknown[] = []

  add(error: unknown): void {
    if (error instanceof AggregateError) this.failures.push(...error.errors)
    else this.failures.push(error)
  }

  capture(operation: () => void): void {
    try {
      operation()
    } catch (error) {
      this.add(error)
    }
  }

  async captureAsync(operation: () => Promise<void>): Promise<void> {
    try {
      await operation()
    } catch (error) {
      this.add(error)
    }
  }

  throwIfAny(message: string): void {
    if (this.failures.length === 1) throw this.failures[0]
    if (this.failures.length > 1) throw new AggregateError(this.failures, message)
  }
}
