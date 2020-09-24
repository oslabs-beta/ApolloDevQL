import EventNode from '../lib/eventLogNode';
import EventLogDataObject from '../lib/eventLogData';
import {EventLogObject} from '../lib/apollo11types';

let dllStructure = new EventLogDataObject();

let eventNode1 = new EventNode({
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
} as EventLogObject);

let eventNode2 = new EventNode({
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
} as EventLogObject);

let eventNode3 = new EventNode({
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
} as EventLogObject);

dllStructure.addEventLog(eventNode1);
console.log(dllStructure);
dllStructure.addEventLog(eventNode2);
console.log(dllStructure);
dllStructure.addEventLog(eventNode3);
console.log(dllStructure);
