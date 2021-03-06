import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormControlLabel, Typography,
  Checkbox, FormGroup, Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles';
import { third } from '../contentData';

class Third extends React.PureComponent {
  constructor(props) {
    super(props);
    this.thirdWeekHandleChange = this.thirdWeekHandleChange.bind(this);
  }


  thirdWeekHandleChange(event) {
    this.props.handleChangeState('third', event.target.name, event.target.value);
  }


  render() {
    const { classes, handleClickOpen, data } = this.props;
    const { rehab } = data;
    const error = rehab === '';
    return (
      <Grid container direction="column" justify="space-around" alignItems="center" style={{ height: '100%' }}>
        <Grid style={{ height: '20%' }} container alignItems="center" justify="center">
          <Typography variant="h5" component="h5" color="textPrimary">Injury Management</Typography>
        </Grid>
        <Grid container spacing={40} className={classes.topGrid} style={{ width: '100%', margin: '0' }} justify="center" alignContent="flex-start" alignItems="flex-start">
          <Grid item xs={12} style={{ paddingTop: '0' }}>
            <FormControl required error={error} component="fieldset" className={classes.formControl}>
              <Typography variant="body1" component="h6" color="textPrimary">What is your current rehab focus: </Typography>
              <FormGroup>
                {third.map(v => (
                  <FormControlLabel
                    style={{ justifyContent: 'space-between' }}
                    labelPlacement="start"
                    key={v.id}
                    name="rehab"
                    onClick={() => handleClickOpen({ discription: v.describe, title: v.title })}
                    control={
                      <Checkbox color="primary" checked={rehab === `${v.id}`} onChange={this.thirdWeekHandleChange} value={`${v.id}`} />
              }
                    label={v.title}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
Third.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};
export default withStyles(styles)(Third);
