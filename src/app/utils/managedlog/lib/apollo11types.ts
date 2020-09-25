import {DocumentNode, GraphQLError} from 'graphql';
import {NetworkStatus} from './networkStatus';

export interface MutationStoreValue {
  mutation: DocumentNode;
  variables?: Object;
  loading?: boolean;
  error?: Error | null;
  request?: Record<string, any>;
  response?: Record<string, any>;
}

export interface QueryStoreValue {
  document: DocumentNode | null;
  variables?: Record<string, any>;
  networkStatus?: NetworkStatus;
  networkError?: Error | null;
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  request?: Record<string, any>;
  response?: Record<string, any>;
}

// interface EventDesc {
//   [k: string]: number | string | undefined | any[] | EventDesc;
// }

// export interface EventObject {
//   [k: string]: QueryStoreValue | MutationStoreValue;
// }

export interface EventLogObject {
  eventId: string;
  type: string;
  event: QueryStoreValue | MutationStoreValue;
}

export interface EventBase {
  mutation: {[k: string]: {mutation: MutationStoreValue; diff?: any}};
  query: {[k: string]: {document: QueryStoreValue; diff?: any}};
}

// export type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// export interface ReadonlyArray<T> {
//   /**
//    * Determines whether an array includes a certain element, returning true or false as appropriate.
//    * @param searchElement The element to search for.
//    * @param fromIndex The position in this array at which to begin searching for searchElement.
//    */
//   includes(searchElement: T, fromIndex?: number): boolean;
// }
