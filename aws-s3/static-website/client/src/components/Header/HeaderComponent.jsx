import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="/" className="navbar-brand">SRE Configuration App</a></div>
                {/* <Nav variant="tabs" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link href="/sla">SLA</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/slo">SLO</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/sli">SLI</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/errorbudget">Error Budget</Nav.Link>
                    </Nav.Item>
                </Nav> */}
                   
                    
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent