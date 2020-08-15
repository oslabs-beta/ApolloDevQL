// Decision to be made about whether a custom endpoint can be entered to run queries on other graphql endpoints.
// This decision should include whether this endpoint would be stored in local state or global state
// Also to consider whether other tabs would require this endpoint

import React, {useState, useEffect} from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
import './index.css';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'; // Colors for TextField component
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//  import Apollo11Logo from '-!svg-react-loader!../assets/logo.svg';
// const URL = 'https://swapi.graph.cool/';
// console.log('window', window.hasOwnProperty('__APOLLO_DEVTOOLS_GLOBAL_HOOK__'));
const defaultQuery = `
query{
  launch(id: 98) {
    id
    site
    isBooked
  }
}`; // make a default query based on the endpoint

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50%',
      },
    },
  }),
);

type GraphiQLProps = {
  endpointURI: string;
};

function GraphiQLPage({endpointURI}: GraphiQLProps) {
  // Hooks for future feature to add custom endpoint - decision on whether this is local or global state TBD
  // const [endpoint, setEndpoint] = useState('');
  // const [requestURI, setRequestURI] = useState('');
  const classes = useStyles();

  /*
Desc: sends HTTP post request to GraphQL API
*/
  function graphQLFetcher(graphQLParms: any) {
    return fetch(endpointURI, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(graphQLParms),
    }).then(response => {
      return response.json();
    });
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    /*
    send a simple request to the GraphQL API
    and confirm it is running and indeed a Gr
    */
  };

  // Function to handle custom endpoint on change - might not be required to run on change, could be only onclick
  // const handleEndpointChange = (e: {target: {value: string}}) => {
  //   setEndpoint(e.target.value);
  // };

  return (
    <div className="wrapper-mainql">
      <p>
        Enter your backend GraphQL endpoint, current endpoint = {endpointURI}
      </p>
      <div id="endpoint-container">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={e => handleSubmit(e)}>
          <TextField
            id="outlined-primary"
            label="Endpoint"
            variant="outlined"
            color="primary"
            // onChange={e => handleEndpointChange(e)}
            value={endpointURI}
          />

          {/* <Button variant="contained" color="primary" type="submit">
            Connect
          </Button> */}
        </form>
      </div>
      <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />
    </div>
  );
}

export default GraphiQLPage;
