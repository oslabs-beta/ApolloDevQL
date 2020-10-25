// Decision to be made about whether a custom endpoint can be entered to run queries on other graphql endpoints.
// This decision should include whether this endpoint would be stored in local state or global state
// Also to consider whether other tabs would require this endpoint

import React, {FunctionComponent, useState, useEffect} from 'react';
import 'graphiql/graphiql.min.css';
import '../Panel/index.css';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'; // Colors for TextField component
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import {css} from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

import GraphiQLPlugin from './GraphiqlPlugin';
import {Apollo11ThemeContext} from '../Panel/themes/ThemeProvider';

//  import Apollo11Logo from '-!svg-react-loader!../assets/logo.svg';

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
        margin: theme.spacing(2),
        width: '90%',
      },
    },
    endpointInput: {
      minWidth: '90%',
    },
    loaderText: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: '10px',
      textAlign: 'center',
    },
  }),
);

// for the react-spinner
const override = css`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
`;

interface GraphiQLProps {
  endpointURI: string;
}

const GraphiQLPage: FunctionComponent<GraphiQLProps> = ({endpointURI}) => {
  // console.log('GraphiQL endpointURI :>> ', endpointURI);
  const classes = useStyles();
  const [loadingEndpoint, setLoadingEndpoint] = useState<boolean>(true);
  const [secondEndpoint, setSecondEndpoint] = useState<string>(
    'https://swapi-graphql.netlify.com/.netlify/functions/index',
  );
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const [endpointForGraphiQL, setEndpointForGraphiql] = useState<string>('');
  const {isDark} = React.useContext(Apollo11ThemeContext);

  useEffect(() => {
    // console.log('useEffect endpointURI :>> ', endpointURI);
    if (endpointURI) {
      // Once the Apolllo endpoint is loaded Display Graphiql
      setLoadingEndpoint(false);

      // Radio button starts with endpointURI selected first
      setSelectedRadio(endpointURI);
      setEndpointForGraphiql(endpointURI);
    }
  }, [endpointURI]);

  const handleSecondEndpointOnChange = e => {
    setSecondEndpoint(e.target.value);
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
    setEndpointForGraphiql(e.target.value);
  };

  return (
    <div className="wrapper-mainql">
      <div id="endpoint-container">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="endpoint-row">
            <TextField
              id="outlined-primary"
              label="Your Apollo GraphQL Endpoint:"
              variant="outlined"
              color="primary"
              className={classes.endpointInput}
              disabled
              value={endpointURI}
            />
            {loadingEndpoint ? null : (
              <Radio
                checked={selectedRadio === endpointURI}
                onChange={e => handleRadio(e)}
                value={endpointURI}
                name="radio-button-demo"
                inputProps={{'aria-label': 'A'}}
              />
            )}
          </div>
          <div className="endpoint-row">
            <TextField
              id="outlined-primary"
              label="Add a different GraphQL Endpoint here:"
              variant="outlined"
              color="primary"
              className={classes.endpointInput}
              onChange={e => handleSecondEndpointOnChange(e)}
              value={secondEndpoint}
            />
            {loadingEndpoint ? null : (
              <Radio
                checked={selectedRadio === secondEndpoint}
                onChange={e => handleRadio(e)}
                value={secondEndpoint}
                name="radio-button-demo"
                inputProps={{'aria-label': 'B'}}
              />
            )}
          </div>
        </form>
      </div>

      {loadingEndpoint ? (
        <>
          <BeatLoader
            css={override}
            size={30}
            color={isDark ? 'white' : '#123abc'}
            loading
          />
          <div className={classes.loaderText}>
            <Typography variant="subtitle1" gutterBottom>
              Loading Apollo GraphQL Endpoint
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              If this doesnt load click
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/oslabs-beta/ApolloDevQL"
                style={{color: isDark ? 'light blue' : 'blue'}}>
                {' '}
                here
              </a>
            </Typography>
          </div>
        </>
      ) : (
        <GraphiQLPlugin
          endpoint={endpointForGraphiQL}
          query={defaultQuery}
          variables={null}
        />
      )}
    </div>
  );
};

export default GraphiQLPage;
