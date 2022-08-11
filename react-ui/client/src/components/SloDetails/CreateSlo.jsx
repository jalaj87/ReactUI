import React, { Component } from 'react'
import { fetchSreData, createUpdateSreData } from '../../services/SreServiceInvoke'

class CreateSlo extends Component {
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
            await fetchSreData('slo').then( (res) =>{
                let sloList = JSON.parse(res);
                
                sloList
                .map(task => {
                    if(task.slo_record_id == this.state.id){
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

            if(!fields["currentSlo"]){
                formIsValid = false;
                errors["currentSlo"] = "Cannot be empty";
            }
            const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
            if(typeof fields["currentSlo"] !== "undefined"){
                if (!rx_live.test(fields["currentSlo"])){
                   formIsValid = false;
                   errors["currentSlo"] = "Only Numeric";
                }        
            }

            if(!fields["sloDescription"]){
                formIsValid = false;
                errors["sloDescription"] = "Cannot be empty";
            }
            
            if(!fields["associatedSli"]){
                formIsValid = false;
                errors["associatedSli"] = "Cannot be empty";
            }
            if(!fields["sloId"]){
                formIsValid = false;
                errors["sloId"] = "Cannot be empty";
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
        let sloDetails = {
            sloId: fields["sloId"],
            applicationId: fields["applicationId"],
            applicationName: fields["applicationName"], 
            environment: fields["environment"], 
            currentSlo: fields["currentSlo"],
            status: "Active",
            associatedSli: fields["associatedSli"],
            modifiedDate: new Date(),
            sloDescription: fields["sloDescription"],
            modifiedBy: "Admin" 
           
        };

        if(this.handleValidation()){
            if(this.state.id === '_add'){
                sloDetails.createdDate= new Date();
                sloDetails.createdBy = "Admin";
                await createUpdateSreData("slo",sloDetails, false).then(res =>{
                    alert(JSON.parse(res))
                    this.props.history.push('/slo');
                });
            } else{
                sloDetails.slo_record_id = this.state.id;
                sloDetails.createdDate= fields["createdDate"];
                sloDetails.createdBy = fields["createdBy"];
                createUpdateSreData("slo", sloDetails, true).then( res => {
                    alert(JSON.parse(res))
                    this.props.history.push('/slo');
                });
            }
        }else{
            alert("Please correct the errors.")
        }
        
    }
    
    cancel(){
        this.props.history.push('/slo');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className="text-center">Create Service Level Objective(SLO)</h2>
        }else{
            return <h2 className="text-center">Update Service Level Objective(SLO)</h2>
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
                                            <label> SLO Id: </label>
                                            <input placeholder="Slo Id" name="sloId" className="form-control"
                                                onChange={this.handleChange.bind(this, "sloId")} value={this.state.fields["sloId"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["sloId"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Current SLO: </label>
                                            <input placeholder="Enter Current SLO" name="currentSlo" className="form-control" 
                                                onChange={this.handleChange.bind(this, "currentSlo")} value={this.state.fields["currentSlo"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["currentSlo"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> SLO Description: </label>
                                            <input placeholder="SLO Description" name="sloDescription" className="form-control" 
                                                onChange={this.handleChange.bind(this, "sloDescription")} value={this.state.fields["sloDescription"]}/>
                                                <span style={{color: "red"}}>{this.state.errors["sloDescription"]}</span>
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

export default CreateSlo