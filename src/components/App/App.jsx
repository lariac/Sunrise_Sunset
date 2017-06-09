import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import HomeContainer from '../../containers/HomeContainer'
import bootstrapStyle from '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <HomeContainer />
      </Router>
    );
  }
};

render(<App />, document.getElementById('app'));
