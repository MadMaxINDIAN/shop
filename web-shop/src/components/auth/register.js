import React, { Component } from 'react';
import { BrowserView, isBrowser, MobileView, isMobile, MobileOnlyView, isMobileOnly } from "react-device-detect";
import './special.css';

class Register extends Component {
    constructor () {
        super();
        this.state = {
            WindowWidth: window.innerWidth
        }
    }
    render (){
    return (
        <div>
            <BrowserView><h1 style={{fontFamily: 'montserrat'}} >Hello</h1></BrowserView>
            <MobileView><h1 style={{fontFamily: 'Catamaran'}}>World</h1></MobileView>
        </div>
    )}
}

export default Register;