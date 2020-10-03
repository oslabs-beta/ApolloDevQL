import EventNode from './eventLogNode';
import {EventLogObject} from './apollo11types';
import eventLogIsDifferent from './objectDifference';

export default class EventLogDataObject {
  eventHead: EventNode | null;

  eventTail: EventNode | null;

  eventLength: number;

  constructor() {
    this.eventHead = null;
    this.eventTail = null;
    this.eventLength = 0;
  }

  setEventHead(content: EventNode) {
    if (this.eventHead === null) {
      this.eventHead = content;
      this.eventTail = content;
    } else {
      this.insertEventLogBefore(this.eventHead, content);
    }
  }

  addEventLog(content: EventNode) {
    if (this.eventHead === null) {
      this.setEventHead(content);
    } else {
      this.insertEventLogAfter(this.eventTail, content);
    }
    this.eventLength += 1;
    // return this;
  }

  insertEventLogBefore(content: EventNode, nodeToInsert: EventNode) {
    if (this.isNodeTailAndHead(nodeToInsert)) return;
    const [insertContent, insertNode] = [content, nodeToInsert]; // make a copy of mutable argument
    insertNode.prev = insertContent.prev;
    insertNode.next = insertContent;
    if (insertContent.prev === null) {
      this.eventHead = insertNode;
    } else {
      insertContent.prev.next = insertNode;
    }
    insertContent.prev = insertNode;
  }

  insertEventLogAfter(content: EventNode, nodeToInsert: EventNode) {
    if (this.isNodeTailAndHead(nodeToInsert)) return;
    const [insertContent, insertNode] = [content, nodeToInsert]; // make a copy of mutable argument
    insertNode.prev = insertContent;
    insertNode.next = insertContent.next;
    if (insertContent.next === null) {
      insertContent.next = insertNode;
      this.eventTail = insertNode;
    } else {
      insertContent.next = insertNode;
    }
    // return this;
  }

  insertEventLogAtPosition(position: number, nodeToInsert: EventNode) {
    if (position === 1) {
      this.setEventHead(nodeToInsert);
      this.eventLength += 1;
    } else {
      let eNode = this.eventHead;
      let currentPosition = 1;
      while (eNode !== null && currentPosition !== position) {
        eNode = eNode.next;
        currentPosition += 1;
      }
      if (eNode !== null) {
        this.insertEventLogBefore(eNode, nodeToInsert);
        this.eventLength += 1;
      } else {
        this.addEventLog(nodeToInsert);
      }
    }
  }

  removeEventLogNodesWithContent(content: EventLogObject) {
    let eNode = this.eventHead;
    while (eNode !== null) {
      const proposedToRemove = eNode;
      eNode = eNode.next;
      if (eventLogIsDifferent(eNode.content, content))
        this.removeEventLogNode(proposedToRemove);
    }
  }

  removeEventLogNode(content: EventNode) {
    if (content === this.eventHead) this.eventHead = this.eventHead.next;
    if (content === this.eventTail) this.eventTail = this.eventTail.prev;
    // cleanup removed EventNode pointers
    this.removeEventNodePointers(content);
    this.eventLength -= 1;
  }

  containsEventNodeWithContent(content: EventLogObject) {
    if (!content) {
      let eNode = this.eventHead;
      while (eNode !== null && !eventLogIsDifferent(eNode.content, content)) {
        eNode = eNode.next;
      }
      return eNode === null;
    }
    return false;
  }

  append(targetObj: EventLogDataObject) {
    const tgtObject = targetObj;
    if (this.eventHead === null) {
      if (tgtObject && tgtObject.eventHead) {
        this.eventHead = tgtObject.eventHead;
      }
      if (tgtObject && tgtObject.eventTail) {
        this.eventTail = tgtObject.eventTail;
      }
    } else if (this.eventHead && tgtObject.eventHead) {
      tgtObject.eventHead.prev = this.eventTail;
      this.eventTail.next = tgtObject.eventHead;
      this.eventTail = tgtObject.eventTail;

      // nDe.head.prev = this.tail;
      // this.tail.next = nDe.head;
      // this.tail = nDe.tail;
    }
    this.eventLength += tgtObject.eventLength;
  }

  debugPrint(): boolean {
    if (this.eventHead === null && this.eventTail === null) {
      console.log('Empty EventLog Object');
      return false;
    }
    let temp = this.eventHead;
    while (temp !== null) {
      process.stdout.write(String(temp.content.eventId));
      process.stdout.write(' <-> ');
      temp = temp.next;
    }
    return true;
  }

  reverseDebugPrint(): boolean {
    if (this.eventTail === null) {
      console.log('Empty EventLog Object');
      return false;
    }
    let temp = this.eventTail;
    while (temp != null) {
      process.stdout.write(String(temp.content.eventId));
      process.stdout.write(' <-> ');
      temp = temp.prev;
    }
    return true;
  }

  isNodeTailAndHead(nodeToInsert: EventNode) {
    return nodeToInsert === this.eventHead && nodeToInsert === this.eventTail;
  }

  removeEventNodePointers(content: EventNode) {
    const removeNode = content;
    if (removeNode.prev !== null) removeNode.prev.next = removeNode.next;
    if (removeNode.next !== null) removeNode.next.prev = removeNode.prev;
    removeNode.prev = null;
    removeNode.next = null;
    // line to shut linter
    console.debug(this.eventLength);
  }

  map(decorator): any[] {
    const _extractList = [];
    let curr = this.eventHead;
    while (curr) {
      _extractList.push(decorator(curr));
      curr = curr.next;
    }
    return _extractList;
  }
}

export type EventLogProps = {
  eventLog: EventLogDataObject;
  handleEventChange: any;
};

export type ApolloTabProps = {
  eventLog: EventLogDataObject;
};
