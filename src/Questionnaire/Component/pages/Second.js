import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio, FormControl, FormControlLabel, RadioGroup, Typography,
  Checkbox, FormHelperText, FormGroup, Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SwipeableTemporaryDrawer from '../../../HOC/swipableSelect';
import styles from '../../styles';
import { second } from '../contentData';

class Second extends React.PureComponent {
  constructor(props) {
    super(props);
    this.secondWeekHandleChange = this.secondWeekHandleChange.bind(this);
  }

  secondWeekHandleChange(event) {
    this.props.handleChangeState('second', event.target.name, event.target.value);
  }

  render() {
    const { classes, handleClickOpen, data } = this.props;
    const { days, location, goal } = data;
    const error = goal === '';
    return (
      <Grid container direction="column" justify="space-around" alignItems="center" style={{ height: '100%' }}>
        <Grid style={{ height: '20%' }} container alignItems="center" justify="center">
          <Typography variant="h5" component="h5" color="textPrimary">Create Your Program</Typography>
        </Grid>
        <Grid container spacing={40} className={classes.topGrid} style={{ width: '100%', margin: '0' }} justify="center" alignContent="flex-start" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="body1" component="h6" color="textPrimary">
                      How many days per week would you like to exercise:
            </Typography>
            <SwipeableTemporaryDrawer
              id="days"
              value={days}
              onChange={this.secondWeekHandleChange}
              content={
                [...Array(3).keys()].map(v => v + 3)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Typography variant="body1" component="h6" color="textPrimary">Where would you like to exercise: </Typography>
              <RadioGroup
                aria-label="Location"
                name="location"
                className={classes.group}
                value={location}
                onChange={this.secondWeekHandleChange}
                row
              >
                <FormControlLabel labelPlacement="start" style={{ marginRight: '0' }} value="gym" control={<Radio color="primary" />} label="Gym" />
                <FormControlLabel labelPlacement="start" style={{ marginRight: '0' }} value="home" control={<Radio color="primary" />} label="Home" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: '0' }}>
            <FormControl required error={error} component="fieldset" className={classes.formControl}>
              <Typography variant="body1" component="h6" color="textPrimary">What is your current training goal: </Typography>
              <FormGroup>
                {second[location].map(v => (
                  <FormControlLabel
                    style={{ justifyContent: 'space-between' }}
                    labelPlacement="start"
                    onClick={() => handleClickOpen({ discription: v.describe, title: v.title })}
                    key={v.id}
                    name="goal"
                    control={
                      <Checkbox color="primary" checked={goal === `${v.id}`} name="goal" onChange={this.secondWeekHandleChange} value={`${v.id}`} />
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
Second.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};
export default withStyles(styles)(Second);
