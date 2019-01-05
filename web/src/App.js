import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import './App.css';
import Dashboard from './components/Dashboard';
import { Layout } from './components/Layout';
import FactoryPage from './components/Factory/FactoryContainer';
import theme from './theme';
import store from './store';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/factory/:id" exact component={FactoryPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
