import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';

class App extends Component {
  render() {
    return <div>{renderRoutes(routes)}</div>;
  }
}

export default App;
