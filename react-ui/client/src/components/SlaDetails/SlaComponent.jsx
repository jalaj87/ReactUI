import React, { Component } from 'react'
import { getSlaList } from '../../services/SreServices'
import './SlaComponent.css'
import { fetchSreData, deleteSreData } from './../../services/SreServiceInvoke'

class SlaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sreList: []
        }
        this.createSla = this.createSla.bind(this);
        this.editSla = this.editSla.bind(this);
    }

    async componentDidMount() {
        await fetchSreData('sla').then((res) => {
            this.setState({ sreList: JSON.parse(res) })
        })
    }

    createSla() {
        this.props.history.push('/createSla/_add');
    }

    editSla(id){
        this.props.history.push(`/createSla/${id}`);
    }

    async deleteSreData(recordId) {
        if(window.confirm("Are you sure to delete this item?")){
            await deleteSreData("sla",recordId).then( res => {
                alert(JSON.parse(res))
                this.setState({sreList: this.state.sreList.filter(sreCharcter => sreCharcter.sla_record_id !== recordId)});
            });
        }else{
            return 
        }
    }
    render() {
        return (
            <div>
                <div className = "row">
                    <button className="btn btn-info" onClick={this.createSla}> Add SLA</button>
                 </div>
                <br />
                { <h4 className="text-center page-hd">Service Level Agreement List</h4>}

                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Application Name</th>
                                <th> Environment</th>
                                <th> SLA</th>
                                <th> SLA Description</th>
                                <th> Associated SLO</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.sreList.map(
                                    slaList =>
                                        <tr key={slaList.sla_record_id}>
                                            <td> {slaList.applicationName} </td>
                                            <td> {slaList.environment}</td>
                                            <td> {slaList.sla}</td>
                                            <td> {slaList.slaDescription}</td>
                                            <td> {slaList.associatedSlo}</td>
                                            <td>
                                                <button onClick={ () => this.editSla(slaList.sla_record_id)} className="btn btn-info">Edit </button>
                                                <button style={{ marginLeft: "10px" }} onClick={ () => this.deleteSreData(slaList.sla_record_id)} className="btn btn-danger">Delete </button>
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