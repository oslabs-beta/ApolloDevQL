import React from 'react';

const Cache = (props: any) => {
  return (
    <div>
      <h1>Current Cache</h1>
      <button
        type="button"
        onClick={() => {
          props.toogleCacheDetails();
        }}>
        Show Cache Details
      </button>
    </div>
  );
};

export default Cache;
