import React, { Component } from 'react'
import {getErrorbudgetList} from '../../services/SreServices'
import './ErrorbudgetComponent.css'
import {fetchSreData, deleteSreData} from './../../services/SreServiceInvoke'

class ErrorbudgetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sreList: []
        }
        this.createErrorBudget = this.createErrorBudget.bind(this);
        this.editErrorBudget = this.editErrorBudget.bind(this);
    }

    async componentDidMount() {
        await fetchSreData('errorbudget').then((res) => {
            this.setState({ sreList: JSON.parse(res) })
        })
    }

    createErrorBudget() {
        this.props.history.push('/createErrorBudget/_add');
    }

    editErrorBudget(id){
        this.props.history.push(`/createErrorBudget/${id}`);
    }

    async deleteSreData(recordId) {
        if(window.confirm("Are you sure to delete this item?")){
            await deleteSreData("errorbudget",recordId).then( res => {
                alert(JSON.parse(res))
                this.setState({sreList: this.state.sreList.filter(sreCharcter => sreCharcter.error_budget_record_id !== recordId)});
            });
        }else{
            return 
        }
    }
    render() {
        return (
            <div>
                
                <div className = "row">
                    <button className="btn btn-info" onClick={this.createErrorBudget}> Add ErrorBudget</button>
                 </div>
                <br />
                 { <h4 className="text-center page-hd">Error Budget List</h4>}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Application Name</th>
                                    <th> Environment</th>
                                    <th> Error Budget %</th>
                                    <th> Reliabity Measurement Description</th>
                                    <th> Associated SLI</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sreList.map(
                                        errorBudgetList => 
                                        <tr key = {errorBudgetList.error_budget_record_id}>
                                             <td> {errorBudgetList.applicationName} </td>
                                             <td> {errorBudgetList.environment}</td>  
                                             <td> {errorBudgetList.errorBudgetPercentage}</td>
                                             <td> {errorBudgetList.reliabilityMesurementDescription}</td>
                                             <td> {errorBudgetList.associatedSli}</td>
                                             <td>
                                                <button onClick={ () => this.editErrorBudget(errorBudgetList.error_budget_record_id)} className="btn btn-info">Edit </button>
                                                <button style={{ marginLeft: "10px" }} onClick={ () => this.deleteSreData(errorBudgetList.error_budget_record_id)} className="btn btn-danger">Delete </button>
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

export default ErrorbudgetComponent