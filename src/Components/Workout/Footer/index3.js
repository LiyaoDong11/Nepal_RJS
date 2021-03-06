import React from 'react';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ClanderIcon from '@material-ui/icons/HelpOutlineOutlined';
import ContentIcon from '@material-ui/icons/AssessmentOutlined';
import TrainingIcon from '@material-ui/icons/FitnessCenterOutlined';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


class FooterComponent extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                style={{ position: 'fixed', bottom: '0', width: '100%', height: '60px' }}
            >
                <BottomNavigationAction disableRipple label="Home" component={Link} to='/history' icon={<HomeIcon />} />
                <BottomNavigationAction disableRipple label="Information" component={Link} to='/workout/plan' icon={<ClanderIcon />} />
                <BottomNavigationAction disableRipple label="Content" component={Link} to={`/workout/${this.props.currentDay}`} icon={<ContentIcon />} />
                <BottomNavigationAction disableRipple label="Training" component={Link} to='/workout/profile' icon={<TrainingIcon />} />
            </BottomNavigation>
        );
    }
}


export default FooterComponent;