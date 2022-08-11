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
                
                <br/>
                <div>
                    { <h4 className="text-center">Welcome to Dashboard</h4>}
                </div>
                 
                 <nav id="access" className="navbar navbar-expand-md">
                <ul className="nav-ul">
                    <li className="nav-li">
                        <NavLink to='/sla' activeClassName="selected" isActive={(match,location)=>{
                            if(!match){
                                return false;
                            }
                            return location.pathname === "/sla" || location.pathname === "/slo" ||
                                    location.pathname === "/sli" || location.pathname === "errorbudget" ||
                                    location.pathname === "/";
                        }}>Service Level Agreements</NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to='/slo'>Service Level Objectives</NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to='/sli'>Service Level Indicator</NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to='/errorbudget'>Error Budget</NavLink>
                    </li>
                </ul>
                </nav>
            </div>
        )
    }
}

export default DashboardComponent