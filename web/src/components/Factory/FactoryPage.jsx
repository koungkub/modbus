import React from 'react';
import { Typography, IconButton, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FactoryCard from './FactoryCard';
import RpiList from './RpiList';
import UpdateFactoryDialog from './UpdateFactoryDialog';
import AddRpiDialog from './AddRpiDialog';
import { updateFactory as updateFactoryAction, addRpi as addRpiAction } from '../../redux/factory/action';

const styles = theme => ({
  clearfix: {
    marginBottom: 40,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class FactoryPage extends React.Component {
  state = {
    updateFactoryDialog: false,
    addRpiDialog: false,
  };

  handleUpdateFactoryDialog = updateFactoryDialog =>
    this.setState({ updateFactoryDialog });

  handleAddRpiDialog = addRpiDialog => this.setState({ addRpiDialog });

  handleUpdated = async factory => {
    const { updateFactory, enqueueSnackbar } = this.props;
    await updateFactory(factory);
    enqueueSnackbar('Successfully updated the data.', {
      variant: 'success',
    });
  };

  handleAdded = async rpi => {
    const { addRpi, enqueueSnackbar, factory } = this.props;
    await addRpi(factory.id, rpi);
    enqueueSnackbar('Successfully added Rasberry Pi to factory.', {
      variant: 'success',
    });
  };

  render() {
    const { updateFactoryDialog, addRpiDialog } = this.state;
    const { factory, classes } = this.props;
    console.log(factory);
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          โรงงาน {factory.id}
          <IconButton
            color="primary"
            className={classes.button}
            aria-label="Edit"
            onClick={() => this.handleUpdateFactoryDialog(true)}
          >
            <EditIcon />
          </IconButton>
        </Typography>
        <FactoryCard factory={factory} />
        <Typography variant="h5" gutterBottom>
          Raspberry Pi ที่ถูกติดตั้งในโรงงาน
          <IconButton
            color="primary"
            className={classes.button}
            aria-label="Add"
            onClick={() => this.handleAddRpiDialog(true)}
          >
            <AddIcon />
          </IconButton>
        </Typography>
        <RpiList rpis={factory.Rpis} />
        <div className={classes.clearfix} />
        <UpdateFactoryDialog
          open={updateFactoryDialog}
          handleClose={() => this.handleUpdateFactoryDialog(false)}
          handleSubmit={this.handleUpdated}
          factory={factory}
        />
        <AddRpiDialog
          open={addRpiDialog}
          handleClose={() => this.handleAddRpiDialog(false)}
          handleSubmit={this.handleAdded}
          factory={factory}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateFactory: data => dispatch(updateFactoryAction(data)),
  addRpi: (id, data) => dispatch(addRpiAction(id, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(FactoryPage)));
