import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    width: '80%',
    margin: '0 auto',
    marginTop: 40,
    maxWidth: 1260,
    minHeight: 'calc(100vh - 240px)',
  },
})

const Layout = ({ classes, ...props }) => (
  <div className={ classes.root }>
    <Header />
    <div className={ classes.content }>{props.children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object,
}

export default withRouter(withStyles(styles)(Layout));
