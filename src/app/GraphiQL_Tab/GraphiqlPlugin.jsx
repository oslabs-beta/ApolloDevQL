// To get Explorer component to work had to move graphql module to 14.1.1 and follow
// this github issue to fix webpack: https://github.com/graphql/graphql-js/issues/1272

import React, {
  Component
} from 'react';
import GraphiQL from 'graphiql';
import GraphiQLExplorer from 'graphiql-explorer';
import {
  getIntrospectionQuery,
  buildClientSchema
} from 'graphql/utilities';

// Css imports
import 'graphiql/graphiql.min.css';
import '../Panel/index.css';

class GraphiQLPlugin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: this.props.endpoint,
      // noFetch: false,
      query: this.props.query,
      variables: this.props.variables,
      schema: null,
      explorerIsOpen: false,
    };
  }

  // eslint-disable-next-line react/sort-comp
  graphQLFetcher = (graphQLParms = {}) => {
    return fetch(this.state.endpoint, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphQLParms),
      })
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  };

  // starts as null then is updated to a fetcher with second endpoint
  // eslint-disable-next-line react/sort-comp
  graphQLFetcher2 = null;

  componentDidMount() {
    // create fetcher with Apollo Endpoint on initial mount
    this.graphQLFetcher({
        query: getIntrospectionQuery(),
        // noFetch: false,
      })
      .then(result => {
        this.setState(oldState => {
          // build schema from introspection query
          return {
            schema: buildClientSchema(result.data),
            query: oldState.query,
            // || this.context.storage.getItem('graphiql:query'),
          };
        });
      })
      .catch(error => console.log(error));

    // if a query exist
    if (this.props.query) {
      // TBD: if auto run query is true
      // if (this.props.automaticallyRunQuery) {
      this.graphiql.handleRunQuery();
      // }
    }

    // Close History Pane before mounting
    if (this.graphiql.state.historyPaneOpen) {
      this.graphiql.handleToggleHistory();
    }

    // Close Doc Pane before mounting
    if (this.graphiql.state.docExplorerOpen) {
      this.graphiql.handleToggleDocs();
    }
  }

  componentDidUpdate(prevProps) {
    // if props.endpoint updates recreate the fetcher and schema
    if (prevProps.endpoint !== this.props.endpoint) {
<<<<<<< HEAD
      this.setState({endpoint: this.props.endpoint});

      // console.log('endpoint in update', this.props.endpoint);
=======
      this.setState({
        endpoint: this.props.endpoint,
      });
>>>>>>> 8f4e6f858f0530fe8eda7b4032f6fa87373ac885

      // create a new fetcher with updated endpoint
      this.graphQLFetcher2 = (graphQLParms = {}) => {
        return fetch(this.props.endpoint, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphQLParms),
          })
          .then(response => {
            return response.json();
          })
          .catch(error => console.log(error));
      };

      // recreate the schema
      this.graphQLFetcher2({
          query: getIntrospectionQuery(),
          // noFetch: false,
        })
        .then(result => {
<<<<<<< HEAD
          // console.log('result of 2nd introspection:', result);
=======
>>>>>>> 8f4e6f858f0530fe8eda7b4032f6fa87373ac885
          this.setState(oldState => {
            return {
              schema: buildClientSchema(result.data),
              query: oldState.query,
              // || this.context.storage.getItem('graphiql:query'),
            };
          });
        })
        .catch(error => console.log(error));

      // clear query
      this.clearDefaultQueryState('');
    }
  }

  handleClickHistoryButton = event => {
    this.graphiql.handleToggleHistory();
  };

  // Not sure what this does
  handleClickPrettifyButton = event => {
    const editor = this.graphiql.getQueryEditor();
    const currentText = editor.getValue();
    const prettyText = print(parse(currentText));
    editor.setValue(prettyText);
  };

  handleToggleExplorer = () => {
    this.setState({
      explorerIsOpen: !this.state.explorerIsOpen,
    });
  };

  clearDefaultQueryState = query => {
    this.setState({
      query,
      variables: undefined,
    });
  };

  render() {
    const {noFetch, query, schema} = this.state;

    // console.log('schema', schema);

    const graphiql = (
      <div className="graphiql-container">
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={queryEdit => this.clearDefaultQueryState(queryEdit)}
          explorerIsOpen={this.state.explorerIsOpen}
          onToggleExplorer={this.handleToggleExplorer}
        />
        <GraphiQL
          fetcher={
            this.graphQLFetcher2 ? this.graphQLFetcher2 : this.graphQLFetcher
          }
          query={query}
          editorTheme="dracula"
          onEditQuery={queryOnEdit => {
            this.clearDefaultQueryState(queryOnEdit);
          }}
          onEditVariables={() => {
            this.clearDefaultQueryState();
          }}
          variables={this.state.variables}
          ref={r => {
            this.graphiql = r;
          }}>
          <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={this.handleClickPrettifyButton}
              label="Prettify"
            />
            <GraphiQL.Button
              onClick={this.handleToggleExplorer}
              label="Explorer"
              title="Toggle Explorer"
            />
            <GraphiQL.Button
              onClick={this.handleClickHistoryButton}
              label="Request History"
            />
            {/* 
                              Feature in Apollo Client Dev Tool to consider
                              <label>
                              <input
                                type="checkbox"
                                checked={noFetch}
                                style={{
                                  verticalAlign: 'middle',
                                }}
                                onChange={() => {
                                  this.setState({
                                    noFetch: !noFetch,
                                    query: undefined,
                                    variables: undefined,
                                  });
                                }}
                              />
                              Load from cache
                              </label> */}
          </GraphiQL.Toolbar>
        </GraphiQL>
      </div>
    );

    return <div className = "graphiql_wrapper" > {
      graphiql
    } < /div>;
  }
}

export default GraphiQLPlugin;