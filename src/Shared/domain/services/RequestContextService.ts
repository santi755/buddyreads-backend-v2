import { injectable } from 'inversify';
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  ip: string;
  userAgent: string | null;
  device: string;
  timestamp: Date;
  requestId: string;
}

@injectable()
export class RequestContextService {
  private static asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
  private static contextCount = 0;
  private static maxContexts = 0;

  setContext(context: RequestContext): void {
    RequestContextService.asyncLocalStorage.enterWith(context);
  }

  getContext(): RequestContext {
    const context = RequestContextService.asyncLocalStorage.getStore();
    if (!context) {
      throw new Error('Request context not set');
    }
    return context;
  }

  getIp(): string {
    return this.getContext().ip;
  }

  getUserAgent(): string | null {
    return this.getContext().userAgent;
  }

  getDevice(): string {
    return this.getContext().device;
  }

  getRequestId(): string {
    return this.getContext().requestId;
  }

  static runWithContext<T>(context: RequestContext, callback: () => T): T {
    RequestContextService.contextCount++;
    RequestContextService.maxContexts = Math.max(
      RequestContextService.maxContexts, 
      RequestContextService.contextCount
    );

    try {
      return RequestContextService.asyncLocalStorage.run(context, callback);
    } finally {
      RequestContextService.contextCount--;
    }
  }

  static getCurrentContext(): RequestContext | undefined {
    return RequestContextService.asyncLocalStorage.getStore();
  }

  static getMetrics() {
    return {
      currentContexts: RequestContextService.contextCount,
      maxContexts: RequestContextService.maxContexts
    };
  }
}