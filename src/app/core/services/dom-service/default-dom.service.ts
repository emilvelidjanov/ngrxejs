import { Injectable } from '@angular/core';

import { DomService, NodeSelection } from './dom.service';

@Injectable()
export class DefaultDomService implements DomService {
  public updateInnerHTMLWithCurrentSelection(element: HTMLElement, innerHTML: string): void {
    const selection = this.getSelection(element);
    element.innerHTML = innerHTML;
    this.setSelection(element, selection);
  }

  public setSelection(parent: Node, nodeSelection: NodeSelection): void {
    if (parent && nodeSelection && nodeSelection.childNodeIndexPath.length) {
      const focusNode = this.getChildNodeByIndexPath(parent, nodeSelection.childNodeIndexPath);
      if (focusNode) {
        const range = document.createRange();
        range.setStart(focusNode, nodeSelection.offset);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  public getSelection(node: Node): NodeSelection {
    if (node) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const indexPath = this.getChildNodeIndexPath(node, range.startContainer);
        const nodeSelection: NodeSelection = {
          childNodeIndexPath: indexPath,
          offset: range.startOffset,
        };
        return nodeSelection;
      } else {
        return null;
      }
    } else {
      return null;
    }
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
    } else {
      return false;
    }
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
      } else {
        return [];
      }
    } else {
      return [];
    }
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
    } else {
      return null;
    }
  }
}
