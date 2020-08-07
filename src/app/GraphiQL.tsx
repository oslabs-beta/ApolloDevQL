import React, {useState} from 'react';
import GraphiQL from 'graphiql';

import 'graphiql/graphiql.min.css';
import './index.css';
import Apollo11Logo from '-!svg-react-loader!../assets/logo.svg';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'; // Colors for TextField component
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const URL = 'https://swapi.graph.cool/';

const defaultQuery = ``; //make a default query based on the endpoint

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

function GraphiQL_Page() {
  const [endpoint, setEndpoint] = useState('');
  const classes = useStyles();

  /* 
Desc: sends HTTP post request to GraphQL API
*/
  function graphQLFetcher(graphQLParms: any) {
    return fetch(endpoint, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(graphQLParms),
    }).then(response => {
      console.log('response', response);
      return JSON.stringify('test');
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    /* 
    send a simple request to the GraphQL API 
    and confirm it is running and indeed a Gr
    */
  };

  const handleEndpointChange = (e: {target: {value: string}}) => {
    setEndpoint(e.target.value);
  };

  return (
    <div>
      <Apollo11Logo className="logo" />
      <p>Enter your backend GraphQL endpoint</p>
      <div id="endpoint-contianer">
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
            onChange={e => handleEndpointChange(e)}
          />
          <Button variant="contained" color="primary" type="submit">
            Connect
          </Button>
        </form>
      </div>
      <GraphiQL
        fetcher={graphQLFetcher}
        defaultQuery={defaultQuery}
        response={JSON.stringify('Hello')}
      />
    </div>
  );
}
export default GraphiQL_Page;
