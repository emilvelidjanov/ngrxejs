import { Injectable } from '@angular/core';

import { DomService } from './dom.service';

@Injectable()
export class DefaultDomService implements DomService {
  public contains(parent: HTMLElement, child: HTMLElement) {
    if (child.isEqualNode(parent)) {
      return true;
    }
    if (!child.parentElement) {
      return false;
    }
    if (child.parentElement.isEqualNode(parent)) {
      return true;
    }
    return this.contains(parent, child.parentElement);
  }
}
