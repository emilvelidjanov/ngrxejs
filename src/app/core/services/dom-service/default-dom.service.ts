import { Injectable } from '@angular/core';

import { DomService, NodeSelection, TagName } from './dom.service';

@Injectable()
export class DefaultDomService implements DomService {
  public canContainChildren(element: HTMLElement): boolean {
    return element.outerHTML.indexOf('/') !== -1;
  }

  public createEmptySelectableElement(tagName: TagName): HTMLElement {
    const element = document.createElement(tagName);
    if (this.canContainChildren(element)) {
      const breakElement = document.createElement('br');
      element.appendChild(breakElement);
    }
    return element;
  }

  public insertNodeAtCurrentRange(node: Node): boolean {
    const range = this.getSelectionRange();
    if (range) {
      range.insertNode(node);
      return true;
    }
    return false;
  }

  public selectNode(parent: Node, child: Node): void {
    const nodeSelection: NodeSelection = {
      childNodeIndexPath: this.getChildNodeIndexPath(parent, child),
      offset: 0,
    };
    this.setSelection(parent, nodeSelection);
  }

  public getSelectionRange(): Range {
    const selection = this.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  }

  public getSelection(): Selection {
    return window.getSelection();
  }

  public setTextContentWithCurrentSelection(node: Node, textContent: string): void {
    const selection = this.getNodeSelection(node);
    node.textContent = textContent;
    this.setSelection(node, selection);
  }

  public setInnerHTMLWithCurrentSelection(element: HTMLElement, innerHTML: string): void {
    const selection = this.getNodeSelection(element);
    element.innerHTML = innerHTML;
    this.setSelection(element, selection);
  }

  public setSelection(parent: Node, nodeSelection: NodeSelection): void {
    if (parent && nodeSelection && nodeSelection.childNodeIndexPath.length) {
      const focusNode = this.getChildNodeByIndexPath(parent, nodeSelection.childNodeIndexPath);
      if (focusNode) {
        const range = document.createRange();
        range.setStart(focusNode, nodeSelection.offset);
        const selection = this.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  public getNodeSelection(node: Node): NodeSelection {
    if (node) {
      const range = this.getSelectionRange();
      if (range) {
        const indexPath = this.getChildNodeIndexPath(node, range.startContainer);
        const nodeSelection: NodeSelection = {
          childNodeIndexPath: indexPath,
          offset: range.startOffset,
        };
        return nodeSelection;
      }
    }
    return null;
  }

  public containsOrIsEqual(parent: Node, child: Node): boolean {
    if (parent && child) {
      if (child.isEqualNode(parent)) {
        return true;
      }
      if (!child.parentElement) {
        return false;
      }
      if (child.parentElement.isEqualNode(parent)) {
        return true;
      }
      return this.containsOrIsEqual(parent, child.parentElement);
    }
    return false;
  }

  public getChildNodeIndexPath(parent: Node, child: Node): number[] {
    if (parent && child) {
      let childRef = child;
      const path: number[] = [];
      while (childRef.parentNode && !parent.isEqualNode(childRef.parentNode)) {
        path.push(Array.prototype.indexOf.call(childRef.parentNode.childNodes, childRef));
        childRef = childRef.parentNode;
      }
      if (childRef.parentNode && parent.isEqualNode(childRef.parentNode)) {
        path.push(Array.prototype.indexOf.call(parent.childNodes, childRef));
        return path.reverse();
      }
    }
    return [];
  }

  public getChildNodeByIndexPath(parent: Node, indexPath: number[]): Node {
    if (parent && parent.childNodes.length && indexPath && indexPath.length) {
      let parentRef = parent;
      let target = null;
      for (const index of indexPath) {
        if (parentRef.childNodes.length) {
          const child = parentRef.childNodes[index];
          if (child) {
            parentRef = child;
            target = child;
          } else {
            target = null;
            break;
          }
        } else {
          target = null;
          break;
        }
      }
      return target;
    }
    return null;
  }
}
