import React from 'react';

import EventIcon from '@material-ui/icons/Event';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

import {CacheProps} from '../utils/managedlog/lib/eventLogNode';

const Cache = ({
  activeEvent,
  toggleCacheDetails,
  handleCacheChange,
  cacheDetailsVisible,
}: CacheProps) => {
  if (activeEvent === null) return <></>;
  const {
    content: {event, cache},
  } = activeEvent;
  let buttonText: string = 'Show Cache Details';

  if (cacheDetailsVisible) {
    buttonText = 'Hide Cache Details';
  } else {
    buttonText = 'Show Cache Details';
  }
  return (
    <div>
      <h1>Cache</h1>
      {event ? (
        <List component="nav" aria-labelledby="nested-list-subheader">
          {/* subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Current Cache
            </ListSubheader>
          } */}
          <button
            type="button"
            onClick={() => {
              toggleCacheDetails();
            }}>
            {buttonText}
          </button>
          {cache &&
            Object.keys(cache).map((cacheItem: any) => {
              const cacheString = cacheItem.toString();

              // Check if key is 0 or undefined
              if (
                cacheItem === 0 ||
                cacheItem === undefined ||
                cacheItem === 'undefined' ||
                !cacheItem ||
                cacheItem === '0' ||
                cacheString === '0'
              ) {
                // if key is 0 or undefined, just log it to the console and return so the next lines of code don't run
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