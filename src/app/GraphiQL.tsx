// Decision to be made about whether a custom endpoint can be entered to run queries on other graphql endpoints.
// This decision should include whether this endpoint would be stored in local state or global state
// Also to consider whether other tabs would require this endpoint

import React, {FunctionComponent, useState, useEffect} from 'react';
import GraphiQL from 'graphiql';
import {getIntrospectionQuery, buildClientSchema} from 'graphql/utilities';
import 'graphiql/graphiql.min.css';
import './index.css';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'; // Colors for TextField component
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import type {GraphQLSchema} from 'graphql';

//  import Apollo11Logo from '-!svg-react-loader!../assets/logo.svg';
// @ts-ignore
import GraphiQLExplorer from 'graphiql-explorer';
// const GraphiQLExplorer = require('graphiql-explorer'); // Have to use require here to avoid Typescript error

// const URL = 'https://swapi.graph.cool/';
// console.log('window', window.hasOwnProperty('__APOLLO_DEVTOOLS_GLOBAL_HOOK__'));
const defaultQuery = `query{
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

interface GraphiQLProps {
  endpointURI: string;
}

const GraphiQLPage: FunctionComponent<GraphiQLProps> = ({endpointURI}) => {
  // Hooks for future feature to add custom endpoint - decision on whether this is local or global state TBD
  // const [endpoint, setEndpoint] = useState('');
  // const [requestURI, setRequestURI] = useState('');
  const classes = useStyles();
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [explorerIsOpen, setExplorerIsOpen] = useState<boolean>(false);

  /*
Desc: sends HTTP post request to GraphQL API
*/
  const graphQLFetcher = (graphQLParms: Object) => {
    return fetch(endpointURI, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParms),
    }).then(response => {
      return response.json();
    });
    // .then(response => response.text())
    // .then(responseBody => {
    //   try {
    //     return JSON.parse(responseBody);
    //   } catch (e) {
    //     return responseBody;
    //   }
    // })
  };

  useEffect(() => {
    // need to setSchema based on introspection Query
    graphQLFetcher({
      query: getIntrospectionQuery(),
    }).then(result => {
      setSchema(buildClientSchema(result.data));
      console.log('schema', schema);
    });
  }, [explorerIsOpen]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    /*
    send a simple request to the GraphQL API
    and confirm it is running and indeed a Gr
    */
  };

  const handleToggleExplorer = () => {
    setExplorerIsOpen(!explorerIsOpen);
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
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleToggleExplorer}>
          Easy Request Builder
        </Button>
      </div>
      <div className="graphiql-container">
        <GraphiQLExplorer
          schema={schema}
          query={defaultQuery}
          explorerIsOpen={explorerIsOpen}
          onToggleExplorer={handleToggleExplorer}
        />
        <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery}>
          {/* <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={handleToggleExplorer}
              label="Explorer"
              title="Toggle Explorer"
            />
          </GraphiQL.Toolbar> */}
        </GraphiQL>
      </div>
    </div>
  );
};

export default GraphiQLPage;
