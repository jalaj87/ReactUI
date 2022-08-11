import React, { Component } from 'react'
import {getSliList} from '../../services/SreServices'
import './SliComponent.css'
import { fetchSreData } from './../../services/SreServiceInvoke'

class SliComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sreList: []
        }
    }

    async componentDidMount() {
        await fetchSreData('sli').then((res) => {
            console.log("sli--",JSON.parse(res))
            this.setState({ sreList: JSON.parse(res) })
        })
    }

    addSLA(){
        this.props.history.push('/addSLA');
    }

    render() {
        return (
            <div>
                
                <br/>
                 { <h4 className="text-center page-hd">Service Level Indicator List</h4>}
                 {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addSLA}> Add List</button>
                 </div> */}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Application Name</th>
                                    <th> Environment</th>
                                    <th> Current SLI</th>
                                    <th> SLI Id</th>
                                    <th> SLI Description</th>
                                    {/* <th> Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sreList.map(
                                        slaList => 
                                        <tr key = {slaList.sliRecordId}>
                                             <td>{slaList.applicationName}</td>
                                             <td> {slaList.environment} </td>
                                             <td> {slaList.currentSli}</td>  
                                             <td> {slaList.sliId}</td>
                                             <td> {slaList.sliDescription}</td>
                                             {/* <td>
                                                 <button  className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}}  className="btn btn-danger">Delete </button>
                                             </td> */}
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

export default SliComponent