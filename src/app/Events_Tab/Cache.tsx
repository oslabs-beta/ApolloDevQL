import React from 'react';
// Material Ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorageIcon from '@material-ui/icons/Storage';
// Project Files
import {CacheProps} from '../utils/managedlog/lib/eventLogNode';

const Cache = ({activeEvent, handleCacheChange}: CacheProps) => {
  if (activeEvent === null) return <></>;
  const {
    content: {event, cache},
  } = activeEvent;

  return (
    <div>
      {event ? (
        <List component="nav" aria-labelledby="nested-list-subheader">
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
                return undefined; // console.log('CACHE === undefined', cacheItem);
              }

              return (
                <ListItem
                  button
                  key={cacheItem}
                  onClick={() => handleCacheChange(cacheItem)}>
                  <ListItemIcon>
                    <StorageIcon />
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
