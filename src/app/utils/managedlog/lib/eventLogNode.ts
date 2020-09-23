import {EventObject} from './apollo11types';

export default class EventNode {
  content: EventObject;

  prev: EventNode | null;

  next: EventNode | null;

  constructor(content: EventObject) {
    this.content = content;
    this.prev = null;
    this.next = null;
  }
}
