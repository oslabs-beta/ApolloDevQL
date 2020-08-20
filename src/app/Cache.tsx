import React from 'react';
import ReactJson from 'react-json-view';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import EventIcon from '@material-ui/icons/Event';

type CacheProps = {
  eventLog: any;
  activeEvent: string;
  toggleCacheDetails: any;
  handleCacheChange: any;
  cacheDetailsVisible: boolean;
};

const Cache = ({
  activeEvent,
  eventLog,
  toggleCacheDetails,
  handleCacheChange,
  cacheDetailsVisible,
}: CacheProps) => {
  if (eventLog[activeEvent]) {
    console.log(
      '=========LOGGING EVENT CACHE=========',
      eventLog[activeEvent].cache,
    );
  }

  let buttonText: string = 'Show Cache Details';

  if (cacheDetailsVisible) {
    buttonText = 'Hide Cache Details';
  } else {
    buttonText = 'Show Cache Details';
  }

  return (
    <div>
      <h1>Current Cache</h1>
      {eventLog[activeEvent] ? (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Current Cache
            </ListSubheader>
          }>
          <button
            type="button"
            onClick={() => {
              toggleCacheDetails();
            }}>
            {buttonText}
          </button>
          {Object.keys(eventLog[activeEvent].cache).map((cacheItem: any) => {
            const cacheString = cacheItem.toString();

            // console.log('eventLog=======', eventLog);

            if (
              cacheItem === 0 ||
              cacheItem === undefined ||
              cacheItem === 'undefined' ||
              !cacheItem ||
              cacheItem === '0' ||
              cacheString === '0'
            ) {
              return console.log('CACHE === undefined', cacheItem);
            }

            return (
              <ListItem
                button
                key={cacheItem}
                onClick={() => handleCacheChange(cacheItem)}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary={cacheItem} />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <div>No event selected</div>
      )}
    </div>
  );
};

export default Cache;
