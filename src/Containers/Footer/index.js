import React, { Component } from 'react'
import FooterComponent from '../../Components/Footer'

export default class FooterContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('============================================');
        console.log(this.props);
        console.log('============================================');
        return (
            <FooterComponent />
        )
    }
}
