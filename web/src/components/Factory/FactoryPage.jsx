import React from 'react';
import { Typography, IconButton, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FactoryCard from './FactoryCard';
import RpiList from './RpiList';
import UpdateFactoryDialog from './UpdateFactoryDialog';
import { updateFactory as updateFactoryAction } from '../../redux/factory/action';

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
  };

  handleUpdateFactoryDialog = updateFactoryDialog =>
    this.setState({ updateFactoryDialog });

  handleSubmit = async (factory) => {
    const { updateFactory, enqueueSnackbar } = this.props;
    await updateFactory(factory);
    enqueueSnackbar('Successfully updated the data.', {
      variant: 'success',
    });
  }

  render() {
    const { updateFactoryDialog } = this.state;
    const { factory, classes } = this.props;
    console.log(factory);
    return <div>
        <Typography variant="h4" gutterBottom>
          โรงงาน {factory.id}
          <IconButton className={classes.button} aria-label="Edit" onClick={() => this.handleUpdateFactoryDialog(true)}>
            <EditIcon />
          </IconButton>
        </Typography>
        <FactoryCard factory={factory} />
        <Typography variant="h5" gutterBottom>
          Raspberry Pi ที่ถูกติดตั้งในโรงงาน
        </Typography>
        <RpiList rpis={factory.Rpis} />
        <div className={classes.clearfix} />
        <UpdateFactoryDialog
          open={updateFactoryDialog}
          handleClose={() => this.handleUpdateFactoryDialog(false)}
          handleSubmit={this.handleSubmit}
          factory={factory}
        />
      </div>;
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  updateFactory: data => dispatch(updateFactoryAction(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(FactoryPage)));
