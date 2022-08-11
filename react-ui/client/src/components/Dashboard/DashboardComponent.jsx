import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'
class DashboardComponent extends Component {
    constructor(props) {
        super(props)

    }
    
    render() {
        return (
            <div>
                
                 <nav id="access"
                 className="navbar is-primary"
                 role="navigation"
                 aria-label="main navigation"
                 >
                
                <div className="container">
                    <div className={`navbar-menu ${"is-active"}`}>
                    <NavLink to='/' className="navbar-item top-head">
                               <span className="heading">SRE Characteristics Dashboard</span>
                            </NavLink>
                        <div className="navbar-end">
                            <NavLink to='/sla' className="navbar-item" activeClassName="is-active"
                                isActive={(match,location)=>{
                                if(!match){
                                    return false;
                                }
                                return location.pathname === "/sla" || location.pathname === "/slo" ||
                                        location.pathname === "/sli" || location.pathname === "errorbudget" ||
                                        location.pathname === "/";
                            }}>
                                Service Level Agreements
                            </NavLink>
                    
                            <NavLink to='/slo' className="navbar-item" activeClassName="is-active">
                                Service Level Objectives
                            </NavLink>
                        
                            <NavLink to='/sli'
                            className="navbar-item"
                            activeClassName="is-active"
                            >Service Level Indicator</NavLink>
                        
                            <NavLink to='/errorbudget'
                            className="navbar-item"
                            activeClassName="is-active"
                            >Error Budget</NavLink>
                        </div>
                    </div>
                </div>
                        
                   
                </nav>
            </div>
        )
    }
}

export default DashboardComponent