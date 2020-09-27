export interface DomService {
  containsOrIsEqual(parent: Node, child: Node): boolean;
  getSelection(node: Node): NodeSelection;
  setSelection(parent: Node, selection: NodeSelection): void;
  getChildNodeIndexPath(parent: Node, child: Node): number[];
  getChildNodeByIndexPath(parent: Node, indexPath: number[]): Node;
  setInnerHTMLWithCurrentSelection(element: HTMLElement, innerHTML: string): void;
  setTextContentWithCurrentSelection(node: Node, textContent: string): void;
}

export interface NodeSelection {
  childNodeIndexPath: number[];
  offset: number;
}
