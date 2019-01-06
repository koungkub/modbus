import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class UpdateFactoryDialog extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false, factory: {} };
  }

  componentDidMount() {
    const { factory } = this.props;
    this.setState({ factory });
  }

  handleChange = name => event => {
    const factory = {
      ...this.state.factory,
      [name]: event.target.value,
    }
    this.setState({ factory });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { factory } = this.state;

    if (handleSubmit) {
      handleSubmit(factory);
    }
  };

  handleClose = () => {
    const { handleClose } = this.props;

    if (handleClose) {
      handleClose();
    }
  }

  render() {
    const { open, classes } = this.props;
    const { factory } = this.state;

    return <Dialog open={open} onClose={this.handleClose} fullWidth={true} maxWidth={"md"} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        แก้ไขข้อมูลโรงงาน
        </DialogTitle>
      <DialogContent>
        <div>
          <TextField id="factory" label="Factory" className={classes.textField} value={factory.factory} onChange={this.handleChange('factory')} margin="normal" />
          <TextField id="name" label="Name" className={classes.textField} value={factory.name} onChange={this.handleChange('name')} margin="normal" />
          <TextField id="address" label="Address" className={classes.textField} value={factory.address} onChange={this.handleChange('address')} margin="normal" />
          <TextField id="tel" label="Tel" className={classes.textField} value={factory.tel} onChange={this.handleChange('tel')} margin="normal" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose}>Cancel</Button>
        <Button onClick={this.handleSubmit} color="primary">
          Save
          </Button>
      </DialogActions>
    </Dialog>;
  }
}

UpdateFactoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateFactoryDialog);