import EventNode from '../lib/eventLogNode';
import EventLogDataObject from '../lib/eventLogData';
import {EventLogObject} from '../lib/apollo11types';

const dllStructure = new EventLogDataObject();
const dllStructure2 = new EventLogDataObject();

const evtNode1: EventLogObject = {
  event: {
    mutation: {
      kind: 'Document',
      definitions: [],
    },
    variables: {},
    loading: false,
    error: null,
  },
  type: 'query',
  eventId: '099087779',
};
const eventNode1 = new EventNode(evtNode1);

const evtNode2: EventLogObject = {
  event: {
    mutation: {
      kind: 'Document',
      definitions: [
        {
          kind: 'OperationDefinition',
          operation: 'mutation',
          name: {kind: 'Name', value: 'newBookTrips'},
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {kind: 'Name', value: 'newbookTrips'},
                arguments: [
                  {
                    kind: 'Argument',
                    name: {kind: 'Name', value: 'newlaunchIds'},
                    value: {
                      kind: 'Variable',
                      name: {kind: 'Name', value: 'newlaunchIds'},
                    },
                  },
                ],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'success'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'message'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'launches'},
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'id'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'isBooked'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: '__typename'},
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: '__typename'},
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      // loc: {start: 0, end: 173},
    },
    variables: {launchIds: ['100']},
    loading: false,
    error: null,
  },
  type: 'mutation',
  eventId: '099087780',
};
const eventNode2 = new EventNode(evtNode2);

const evtNode3: EventLogObject = {
  event: {
    mutation: {
      kind: 'Document',
      definitions: [
        {
          kind: 'OperationDefinition',
          operation: 'mutation',
          name: {kind: 'Name', value: 'cancel'},
          variableDefinitions: [
            {
              kind: 'VariableDefinition',
              variable: {
                kind: 'Variable',
                name: {kind: 'Name', value: 'launchId'},
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {kind: 'Name', value: 'ID'},
                },
              },
              directives: [],
            },
          ],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {kind: 'Name', value: 'cancelTrip'},
                arguments: [
                  {
                    kind: 'Argument',
                    name: {kind: 'Name', value: 'launchId'},
                    value: {
                      kind: 'Variable',
                      name: {kind: 'Name', value: 'launchId'},
                    },
                  },
                ],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'success'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'message'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'launches'},
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'id'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'isBooked'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: '__typename'},
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: '__typename'},
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    variables: {launchId: '101'},
    loading: true,
    error: null,
  },
  type: 'mutation',
  eventId: '099087787',
};
const eventNode3 = new EventNode(evtNode3);

const evtNode4: EventLogObject = {
  event: {
    mutation: {
      kind: 'Document',
      definitions: [],
    },
    variables: {},
    loading: false,
    error: null,
  },
  type: 'query',
  eventId: '099087793',
};
const eventNode4 = new EventNode(evtNode4);

const evtNode5: EventLogObject = {
  event: {
    mutation: {
      kind: 'Document',
      definitions: [
        {
          kind: 'OperationDefinition',
          operation: 'mutation',
          name: {kind: 'Name', value: 'newBookTrips'},
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {kind: 'Name', value: 'newbookTrips'},
                arguments: [
                  {
                    kind: 'Argument',
                    name: {kind: 'Name', value: 'newlaunchIds'},
                    value: {
                      kind: 'Variable',
                      name: {kind: 'Name', value: 'newlaunchIds'},
                    },
                  },
                ],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'success'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'message'},
                      arguments: [],
                      directives: [],
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: 'launches'},
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'id'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: 'isBooked'},
                            arguments: [],
                            directives: [],
                          },
                          {
                            kind: 'Field',
                            name: {kind: 'Name', value: '__typename'},
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Field',
                      name: {kind: 'Name', value: '__typename'},
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      // loc: {start: 0, end: 173},
    },
    variables: {launchIds: ['100']},
    loading: false,
    error: null,
  },
  type: 'mutation',
  eventId: '099087796',
};
const eventNode5 = new EventNode(evtNode5);

dllStructure.addEventLog(eventNode1);
// console.log(dllStructure);
dllStructure.addEventLog(eventNode2);
// console.log(dllStructure);
dllStructure.addEventLog(eventNode3);
// console.log(dllStructure);
// console.log(dllStructure.map(e => e));

dllStructure2.addEventLog(eventNode4);
dllStructure2.addEventLog(eventNode5);

// eventNode1: '099087779',
// eventNode2: '099087780',
// eventNode3: '099087787',
// eventNode4: '099087793',
// eventNode5: '099087796',

console.log('First DLL ::', dllStructure);
console.log(dllStructure.debugPrint());
console.log(dllStructure.reverseDebugPrint());
console.log('Second DLL ::', dllStructure2);
console.log(dllStructure2.debugPrint());
console.log(dllStructure2.reverseDebugPrint());

dllStructure.append(dllStructure2);
console.log('New DLL ::', dllStructure);
console.log(dllStructure.debugPrint());
console.log(dllStructure.reverseDebugPrint());

// const allStructures = dllStructure.addEventLog(dllStructure2.eventHead);
// const allStructures = dllStructure.insertEventLogAfter(
//   dllStructure.eventTail,
//   dllStructure2.eventHead,
// );
// console.log('Addition of BOTH');
// console.log(allStructures);

// let nde = allStructures.eventHead;
// while (nde) {
//   console.log('NDE :: ', nde);
//   console.log(nde.content.eventId);
//   nde = nde.next;
// }
