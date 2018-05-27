import React, { Component } from 'react';
import { Button, WingBlank } from 'antd-mobile';
import {Link} from 'react-router-dom';
import LogoLocation from '../LogoLocation/';
// import Background from '../../assets/launchscreen.png';
// backgroundImage: `url(${Background})`,

var buttonStyle={
  justifyContent: 'center',
  alignItems: 'end',
  backgroundColor: 'green',
}

var screenStyle = {
  backgroundColor: 'pink',
};

export default class Launch extends Component {

  render() {
    return (
      <div style={screenStyle}>
        <div>
        <LogoLocation/>
        <WingBlank>
        <div>
          <Link to='login' >
            <Button type="primary" style={buttonStyle}>Get Started</Button>
          </Link>
        </div>
        </WingBlank>

        </div>
      </div>
    );
  }
}