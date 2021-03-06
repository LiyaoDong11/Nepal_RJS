import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SpeedDialTooltipOpen from '../HOC/speedDial';
import styles from './styles';

const menu = [{ name: 'Workout', color: 'rgba(0,96,100,0.5)' }, { name: 'Rehab', color: 'rgba(86,200,216,0.5)' },
  { name: 'Profile', color: 'rgba(111,249,255,0.4)' }, { name: 'Content', color: 'rgba(0,172,193,0.4)' },
  { name: 'Question', color: 'rgba(38,198,218,0.3)' }, { name: 'FAQ', color: 'rgba(136,255,255,0.3)' }];


class Mainmenu extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <Grid container className={classes.container} alignItems="center" direction="column" justify="space-between">
          <SpeedDialTooltipOpen shadow />
          <Grid container justify="center" alignContent="center" alignItems="center" className={classes.topGrid}>
            <Typography variant="h2" component="h2">Nepal</Typography>
          </Grid>
          <Grid container justify="center" alignContent="center" alignItems="center" className={classes.menuGrid}>
            {menu.map(v => (
              <Grid key={v.name} style={{ backgroundColor: v.color }} justify="center" alignItems="center" className={classes.childGrid} container>
                <Typography style={{ color: 'darkcyan' }} variant="h6" component="h6">{v.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Mainmenu);
