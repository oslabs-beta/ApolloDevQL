import {DocumentNode, GraphQLError} from 'graphql';
import {NetworkStatus} from './networkStatus';

export interface MutationStoreValue {
  mutation: DocumentNode;
  variables?: Object;
  loading?: boolean;
  error?: Error | null;
}

export interface QueryStoreValue {
  document: DocumentNode | null;
  variables?: Record<string, any>;
  networkStatus?: NetworkStatus;
  networkError?: Error | null;
  graphQLErrors?: ReadonlyArray<GraphQLError>;
}

// interface EventDesc {
//   [k: string]: number | string | undefined | any[] | EventDesc;
// }
export interface EventObject {
  // [k: string]: string | boolean | EventDesc;
  [k: string]: QueryStoreValue | MutationStoreValue;
}

export interface EventBase {
  mutation: EventObject[];
  query: EventObject[];
}
