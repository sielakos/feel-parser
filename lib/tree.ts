export type TreeChildren<T> = Array<Tree<T> | T>;

export class Tree<T> {
  private _operator: string;
  private _children: TreeChildren<T>;

  constructor(operator: string, children: TreeChildren<T>) {
    this._operator = operator;
    this._children = children;
  }

  get operator(): string {
    return this._operator;
  }

  get children(): TreeChildren<T> {
    return this._children;
  }
}