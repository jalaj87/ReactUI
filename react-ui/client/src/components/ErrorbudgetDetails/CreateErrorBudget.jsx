import React, { Component } from 'react'
import { fetchSreData, createUpdateSreData } from '../../services/SreServiceInvoke'

class CreateErrorBudget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fields: {},
            errors: {}
        }
        this.saveOrUpdate = this.saveOrUpdate.bind(this);
    }

    async componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            await fetchSreData('errorbudget').then( (res) =>{
                let errorBudgetList = JSON.parse(res);
                
                errorBudgetList
                .map(task => {
                    if(task.error_budget_record_id == this.state.id){
                        this.setState({fields:task});
                    } 
                }) 
            });
        }        
    }

    handleValidation(){
        let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;

            if(!fields["applicationId"]){
                formIsValid = false;
                errors["applicationId"] = "Cannot be empty";
            }
            if(typeof fields["applicationId"] !== "undefined"){
                if(!fields["applicationId"].match(/^[0-9]+$/)){
                   formIsValid = false;
                   errors["applicationId"] = "Only Numeric";
                }        
            }
           
            if(!fields["applicationName"]){
               formIsValid = false;
               errors["applicationName"] = "Cannot be empty";
            }
            
            if(!fields["environment"]){
                formIsValid = false;
                errors["environment"] = "Cannot be empty";
            }
            if(typeof fields["environment"] !== "undefined"){
                if(!fields["environment"].match(/^[a-zA-Z]+$/)){
                   formIsValid = false;
                   errors["environment"] = "Only letters";
                }        
            }

            if(!fields["reliabilityCalculationFrequency"]){
                formIsValid = false;
                errors["reliabilityCalculationFrequency"] = "Cannot be empty";
            }
            
            if(!fields["reliabilityMesurementDescription"]){
                formIsValid = false;
                errors["reliabilityMesurementDescription"] = "Cannot be empty";
            }
            
            if(!fields["associatedSli"]){
                formIsValid = false;
                errors["associatedSli"] = "Cannot be empty";
            }
            if(!fields["errorBudgetPercentage"]){
                formIsValid = false;
                errors["errorBudgetPercentage"] = "Cannot be empty";
            }
            const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
            if(typeof fields["errorBudgetPercentage"] !== "undefined"){
                if (!rx_live.test(fields["errorBudgetPercentage"])){
                   formIsValid = false;
                   errors["errorBudgetPercentage"] = "Only Numeric";
                }        
            }
        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    saveOrUpdate = async (e) => {
        let fields = this.state.fields;
        e.preventDefault();
        let errorBudgetDetails = {
            applicationId: fields["applicationId"],
            applicationName: fields["applicationName"], 
            environment: fields["environment"], 
            reliabilityCalculationFrequency: fields["reliabilityCalculationFrequency"],
            status: "Active",
            associatedSli: fields["associatedSli"],
            modifiedDate: new Date(),
            reliabilityMesurementDescription: fields["reliabilityMesurementDescription"],
            errorBudgetPercentage: fields["errorBudgetPercentage"],
            modifiedBy: "Admin" 
           
        };
        if(this.handleValidation()){
            if(this.state.id === '_add'){
                errorBudgetDetails.createdDate= new Date();
                errorBudgetDetails.createdBy = "Admin";
                await createUpdateSreData("errorbudget",errorBudgetDetails, false).then(res =>{
                    alert(JSON.parse(res))
                    this.props.history.push('/errorbudget');
                });
            } else{
                errorBudgetDetails.error_budget_record_id = this.state.id;
                errorBudgetDetails.createdDate= fields["createdDate"];
                errorBudgetDetails.createdBy = fields["createdBy"];
                createUpdateSreData("errorbudget", errorBudgetDetails, true).then( res => {
                    alert(JSON.parse(res))
                    this.props.history.push('/errorbudget');
                });
            }
        }else{
            alert("Please correct the errors.")
        }
        
    }
    
    cancel(){
        this.props.history.push('/errorbudget');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className="text-center">Create Error Budget</h2>
        }else{
            return <h2 className="text-center">Update Error Budget</h2>
        }
    }
    getButtonTitle(){
        if(this.state.id === '_add'){
            return 'Submit'
        }else {
            return 'Update'
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Application ID: </label>
                                            <input placeholder="Application Id" name="applicationId" className="form-control"
                                                onChange={this.handleChange.bind(this, "applicationId")} value={this.state.fields["applicationId"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["applicationId"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Application Name: </label>
                                            <input placeholder="Application Name" name="applicationName" className="form-control"
                                                onChange={this.handleChange.bind(this, "applicationName")} value={this.state.fields["applicationName"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["applicationName"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Environment: </label>
                                            <input placeholder="Environment" name="environment" className="form-control" 
                                                onChange={this.handleChange.bind(this, "environment")} value={this.state.fields["environment"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["environment"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Reliability Calculation Frequency: </label>
                                            <input placeholder="Reliability Calculation Frequency" name="reliabilityCalculationFrequency" className="form-control"
                                                onChange={this.handleChange.bind(this, "reliabilityCalculationFrequency")} value={this.state.fields["reliabilityCalculationFrequency"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["reliabilityCalculationFrequency"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Error Budget Percentage: </label>
                                            <input placeholder="Error Budget Percentage" name="errorBudgetPercentage" className="form-control" 
                                                onChange={this.handleChange.bind(this, "errorBudgetPercentage")} value={this.state.fields["errorBudgetPercentage"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["errorBudgetPercentage"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Reliability Mesurement Description: </label>
                                            <input placeholder="Reliability Mesurement Description" name="reliabilityMesurementDescription" className="form-control" 
                                                onChange={this.handleChange.bind(this, "reliabilityMesurementDescription")} value={this.state.fields["reliabilityMesurementDescription"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["reliabilityMesurementDescription"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Associated SLI: </label>
                                            <input placeholder="Associated SLI" name="associatedSli" className="form-control" 
                                                onChange={this.handleChange.bind(this, "associatedSli")} value={this.state.fields["associatedSli"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["associatedSli"]}</span>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdate}>{ this.getButtonTitle()}</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateErrorBudget