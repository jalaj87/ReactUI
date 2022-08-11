import React, { Component } from 'react'
import { fetchSreData, createUpdateSreData } from './../../services/SreServiceInvoke'

class CreateSla extends Component {
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
            await fetchSreData('sla').then( (res) =>{
                let slaList = JSON.parse(res);
                
                slaList
                .map(task => {
                    if(task.sla_record_id == this.state.id){
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

            if(!fields["sla"]){
                formIsValid = false;
                errors["sla"] = "Cannot be empty";
            }
            const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
            if(typeof fields["sla"] !== "undefined"){
                if (!rx_live.test(fields["sla"])){
                   formIsValid = false;
                   errors["sla"] = "Only Numeric";
                }        
            }

            if(!fields["slaDescription"]){
                formIsValid = false;
                errors["slaDescription"] = "Cannot be empty";
            }
            
            if(!fields["associatedSlo"]){
                formIsValid = false;
                errors["associatedSlo"] = "Cannot be empty";
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
        let slaDetails = {
            applicationId: fields["applicationId"],
            applicationName: fields["applicationName"], 
            environment: fields["environment"], 
            sla: fields["sla"],
            status: "Active",
            associatedSlo: fields["associatedSlo"],
            modifiedDate: new Date(),
            slaDescription: fields["slaDescription"],
            modifiedBy: "Admin" 
           
        };

        if(this.handleValidation()){
            if(this.state.id === '_add'){
                slaDetails.createdDate= new Date();
                slaDetails.createdBy = "Admin";
                await createUpdateSreData("sla",slaDetails, false).then(res =>{
                    alert(JSON.parse(res))
                    this.props.history.push('/sla');
                });
            } else{
                slaDetails.sla_record_id = this.state.id;
                slaDetails.createdDate= fields["createdDate"];
                slaDetails.createdBy = fields["createdBy"];
                createUpdateSreData("sla", slaDetails, true).then( res => {
                    alert(JSON.parse(res))
                    this.props.history.push('/sla');
                });
            }
        }else{
            alert("Please correct the errors")
        }
        
    }
    
    cancel(){
        this.props.history.push('/sla');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Create Service Level Agreement(SLA)</h3>
        }else{
            return <h3 className="text-center">Update Service Level Agreement(SLA)</h3>
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
                                            <label> SLA: </label>
                                            <input placeholder="Enter SLA" name="sla" className="form-control" 
                                                onChange={this.handleChange.bind(this, "sla")} value={this.state.fields["sla"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["sla"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> SLA Description: </label>
                                            <input placeholder="SLA Description" name="slaDescription" className="form-control" 
                                                onChange={this.handleChange.bind(this, "slaDescription")} value={this.state.fields["slaDescription"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["slaDescription"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Associated SLO: </label>
                                            <input placeholder="Associated SLO" name="associatedSlo" className="form-control" 
                                                onChange={this.handleChange.bind(this, "associatedSlo")} value={this.state.fields["associatedSlo"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["associatedSlo"]}</span>
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

export default CreateSla