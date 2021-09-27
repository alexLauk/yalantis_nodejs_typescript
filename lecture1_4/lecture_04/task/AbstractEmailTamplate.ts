export abstract class AbstractEmailTemplate<TParams extends {}> {
  
    protected readonly _params: TParams;
  
    constructor(params: TParams) {
      this._params = params;
    }

    public abstract getSubject(): string;

    public abstract getText(): string;
  
    public abstract getHTML(): string;
  
  }
