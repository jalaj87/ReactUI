import React, { Component } from 'react'
import {getSloList} from '../../services/SreServices'
import './SloComponent.css'
import {fetchSreData, deleteSreData} from './../../services/SreServiceInvoke'

class SloComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sreList: []
        }
        this.createSlo = this.createSlo.bind(this);
        this.editSlo = this.editSlo.bind(this);
    }

    async componentDidMount() {
        await fetchSreData('slo').then((res) => {
            this.setState({ sreList: JSON.parse(res) })
        })
    }

    createSlo() {
        this.props.history.push('/createSlo/_add');
    }

    editSlo(id){
        this.props.history.push(`/createSlo/${id}`);
    }

    async deleteSreData(recordId) {
        if(window.confirm("Are you sure to delete this item?")){
            await deleteSreData("slo",recordId).then( res => {
                alert(JSON.parse(res))
                this.setState({sreList: this.state.sreList.filter(sreCharcter => sreCharcter.slo_record_id !== recordId)});
            });
        }else{
            return 
        }
    }

    async deleteSreData(recordId) {
        if(window.confirm("Are you sure to delete this item?")){
            await deleteSreData("slo",recordId).then( res => {
                alert(JSON.parse(res))
                this.setState({sreList: this.state.sreList.filter(sreCharcter => sreCharcter.slo_record_id !== recordId)});
            });
        }else{
            return 
        }
        
    }

    render() {
        return (
            <div>
                
                <div className = "row">
                    <button className="btn btn-info" onClick={this.createSlo}> Add SLO</button>
                 </div>
                <br />
                 { <h4 className="text-center page-hd">Service Level Objective List</h4>}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Application Name</th>
                                    <th> Environment</th>
                                    <th> SLO ID</th>
                                    <th> Current SLO</th>
                                    <th> SLO Description</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sreList.map(
                                        sloList => 
                                        <tr key = {sloList.slo_record_id}>
                                            <td> {sloList.applicationName} </td>
                                            <td> {sloList.environment} </td>
                                             <td> {sloList.sloId} </td>
                                             <td> {sloList.currentSlo}</td>  
                                             <td> {sloList.sloDescription}</td>
                                             <td>
                                            <button onClick={ () => this.editSlo(sloList.slo_record_id)} className="btn btn-info">Edit </button>
                                            <button style={{ marginLeft: "10px" }} onClick={ () => this.deleteSreData(sloList.slo_record_id)} className="btn btn-danger">Delete </button>
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

export default SloComponent