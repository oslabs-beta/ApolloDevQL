import {EventLogObject} from './apollo11types';

export default class EventNode {
  content: EventLogObject;

  prev: EventNode | null;

  next: EventNode | null;

  constructor(content: EventLogObject) {
    this.content = content;
    this.prev = null;
    this.next = null;
  }
}
