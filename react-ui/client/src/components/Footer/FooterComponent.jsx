import React, { Component } from 'react'
import './Footer.css';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="footer-bottom">
                <footer className = "footer">
                    <div>
                    <img src="https://www.accenture.com/favicon.ico"></img><span>Accenture</span>
                    <p className="foot-copy">@ 2021 Accenture Solutions Pvt Ltd.All Rights Reserved</p>
                    </div>
                    
                </footer>
                
            </div>
        )
    }
}

export default FooterComponent