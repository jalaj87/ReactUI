import React, { Component } from 'react'
import {getSreList} from '../../services/SreServices'

class SlaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sreList: []
        }
        this.addSLA = this.addSLA.bind(this);
    }

    componentDidMount(){
        getSreList().then((res) => {
            this.setState({sreList: res})
        })
    }

    addSLA(){
        this.props.history.push('/addSLA');
    }

    render() {
        return (
            <div>
                
                <br/>
                 { <h4 className="text-center">SLA List</h4>}
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addSLA}> Add List</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Application Name</th>
                                    <th> Environment</th>
                                    <th> SLA</th>
                                    <th> SLA Description</th>
                                    <th> Associated SLA</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sreList.map(
                                        slaList => 
                                        <tr key = {slaList.slaRecordId}>
                                             <td> {slaList.applicationName} </td>
                                             <td> {slaList.environment}</td>  
                                             <td> {slaList.sla}</td>
                                             <td> {slaList.slaDescription}</td>
                                             <td> {slaList.associatedSlo}</td>
                                             <td>
                                                 <button  className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}}  className="btn btn-danger">Delete </button>
                                                {/*  <button style={{marginLeft: "10px"}}  className="btn btn-info">View </button> */}
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default SlaComponent