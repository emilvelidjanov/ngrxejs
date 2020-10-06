export interface DomService {
  containsOrIsEqual(parent: Node, child: Node): boolean;
  getNodeSelection(node: Node): NodeSelection;
  setSelection(parent: Node, selection: NodeSelection): void;
  getChildNodeIndexPath(parent: Node, child: Node): number[];
  getChildNodeByIndexPath(parent: Node, indexPath: number[]): Node;
  setInnerHTMLWithCurrentSelection(element: HTMLElement, innerHTML: string): void;
  setTextContentWithCurrentSelection(node: Node, textContent: string): void;
  getSelection(): Selection;
  getSelectionRange(): Range;
  selectNode(parent: Node, child: Node): void;
  createEmptySelectableElement(tagName: TagName): HTMLElement;
  insertNodeAtCurrentRange(node: Node): boolean;
  canContainChildren(element: HTMLElement): boolean;
}

export interface NodeSelection {
  childNodeIndexPath: number[];
  offset: number;
}

export type TagName = 'p';
