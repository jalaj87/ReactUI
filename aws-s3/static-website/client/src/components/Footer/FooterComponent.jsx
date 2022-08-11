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
                    <span className="text-muted">All Rights Reserved</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent