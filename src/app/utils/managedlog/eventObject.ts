interface EventDesc {
  [k: string]: number | string | undefined | any[] | EventDesc;
}
interface EventObject {
  [k: string]: string | boolean | EventDesc;
}

export interface EventBase {
  mutation: EventObject[];
  query: EventObject[];
}

export class EventNode {
  content: EventObject;
  prev: EventNode | null;
  next: EventNode | null;

  constructor(content: EventObject) {
    this.content = content;
    this.prev = null;
    this.next = null;
  }
}

class EventLogContainer {
  eventHead: EventNode | null;
  eventTail: EventNode | null;
  private eventsBase: EventBase | null;

  constructor() {
    this.eventHead = null;
    this.eventTail = null;
    this.eventsBase = null;
  }

  // <T>sequenceApolloLog(obj<T>: any) {

  // }

  setEventHead(content: EventNode) {
    if (this.eventHead === null) {
      this.eventHead = this.eventTail = content;
    } else {
      this.insertEventLogBefore(this.eventHead, content);
    }
  }

  addEventLog(content: EventNode) {
    if (this.eventTail === null) {
      this.setEventHead(content);
    } else {
      this.insertEventLogAfter(this.eventTail, content);
    }
  }

  insertEventLogBefore(content: EventNode, nodeToInsert: EventNode) {
    if (this.isNodeTailAndHead(nodeToInsert)) return;
    this.removeEventLogNode(content);
    nodeToInsert.prev = content.prev;
    nodeToInsert.next = content;
    if (content.prev === null) {
      this.eventHead = nodeToInsert;
    } else {
      content.prev.next = nodeToInsert;
    }
    content.prev = nodeToInsert;
  }

  insertEventLogAfter(content: EventNode, nodeToInsert: EventNode) {
    if (this.isNodeTailAndHead(nodeToInsert)) return;
    this.removeEventLogNode(content);
    nodeToInsert.prev = content;
    nodeToInsert.next = content.next;
    if (content.next === null) {
      this.eventTail = nodeToInsert;
    } else {
      content.next.prev = nodeToInsert;
    }
  }

  insertEventLogAtPosition(position: number, nodeToInsert: EventNode) {
    if (position === 1) {
      this.setEventHead(nodeToInsert);
    } else {
      let eNode = this.eventHead;
      let currentPosition = 1;
      while (eNode !== null && currentPosition++ !== position)
        eNode = eNode.next;
      if (eNode !== null) {
        this.insertEventLogBefore(eNode, nodeToInsert);
      } else {
        this.addEventLog(nodeToInsert);
      }
    }
  }

  removeEventLogNodesWithContent(content: EventObject) {
    let eNode = this.eventHead;
    while (eNode !== null) {
      const proposedToRemove = eNode;
      eNode = eNode.next;
      if (this.eventLogIsDifferent(eNode.content, content))
        this.removeEventLogNode(proposedToRemove);
    }
  }

  removeEventLogNode(content: EventNode) {
    if (content === this.eventHead) this.eventHead = this.eventHead.next;
    if (content === this.eventTail) this.eventTail = this.eventTail.prev;
    // cleanup removed EventNode pointers
    this.removeEventNodePointers(content);
  }

  containsEventNodeWithContent(content: EventObject) {
    if (!content) {
      let eNode = this.eventHead;
      while (
        eNode !== null &&
        !this.eventLogIsDifferent(eNode.content, content)
      ) {
        eNode = eNode.next;
      }
      return eNode === null;
    }
    return false;
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

  isNodeTailAndHead(nodeToInsert: EventNode) {
    return nodeToInsert === this.eventHead && nodeToInsert === this.eventTail;
  }

  removeEventNodePointers(content: EventNode) {
    if (content.prev !== null) content.prev.next = content.next;
    if (content.next !== null) content.next.prev = content.prev;
    content.prev = null;
    content.next = null;
  }
}

export default new EventLogContainer();
