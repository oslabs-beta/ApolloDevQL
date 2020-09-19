export interface EventBase {}

export interface EventType {}

export class EventNode {
  content: EventType;
  prev: EventNode | null;
  next: EventNode | null;

  constructor(content: EventType) {
    this.content = content;
    this.prev = null;
    this.next = null;
  }
}

export class EventLogContainer {
  eventHead: EventNode | null;
  eventTail: EventNode | null;
  private eventsBase: EventBase | null;

  constructor() {
    this.eventHead = null;
    this.eventTail = null;
    this.eventsBase = null;
  }

  isLogValuePrimitive(val: any): boolean {
    return val == null || /^[sbn]/.test(typeof val);
  }

  eventLogIsDifferent(a: any, b: any): boolean {
    return (
      a &&
      b &&
      Object.keys(b).every(bKey => {
        const bVal = b[bKey];
        const aVal = a[bKey];
        if (typeof bVal === 'function') {
          return bVal(aVal);
        }
        return this.isLogValuePrimitive(bVal)
          ? bVal === aVal
          : this.eventLogIsDifferent(aVal, bVal);
      })
    );
  }

  setEventHead(node: Node) {
    // Write your code here.
  }

  setEventTail(node: Node) {
    // Write your code here.
  }

  insertEventLogBefore(node: EventNode, nodeToInsert: EventNode) {
    // Write your code here.
  }

  insertEventLogAfter(node: EventNode, nodeToInsert: EventNode) {
    // Write your code here.
  }

  insertEventLogAtPosition(position: EventType, nodeToInsert: EventNode) {
    // Write your code here.
  }

  removeEventLogNodesWithContent(conten: EventType) {
    // Write your code here.
  }

  removeEventLogNode(node: EventNode) {
    // Write your code here.
  }

  containsEventNodeWithContent(content: EventType) {
    // Write your code here.
    return false;
  }
}
