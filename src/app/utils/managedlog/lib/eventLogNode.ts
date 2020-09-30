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

export type Apollo11ThemeContextType = {
  currentTheme: string;
  setTheme: (value: string) => void;
};

export type CacheDetailsProps = {
  activeEvent?: EventNode;
  activeCache: any;
};

export type CacheProps = {
  activeEvent?: EventNode;
  toggleCacheDetails: any;
  handleCacheChange: any;
  cacheDetailsVisible: boolean;
};

export type EventDetailsProps = {
  activeEvent?: EventNode;
};

export type EventPanelType = {
  children: React.ReactNode;
  panelValue: number;
  panelIndex: number;
};

export type MainDrawerProps = {
  endpointURI: string;
  events: any;
  networkEvents: any;
  networkURI: string;
};
