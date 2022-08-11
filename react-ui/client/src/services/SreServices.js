import axios from 'axios';
const SRE_API_BASE_URL = "http://localhost:8080/api/v1/sre";

export const getSlaList = async () => {

    
         //axios.get(SRE_API_BASE_URL);
         let response = [{
            "sreType": "SLA",
            "slaRecordId":"123-1",
            "applicationId":"123",
            "applicationName": "Test",
            "associatedSlo": "test-val",
            "environment": "dev",
            "sla": "99.5",
            "slaDescription": "A test app",
            "status": "Active",
            "createdDate": "2021-04-04T00:00:00Z",
            "modifiedDate": "2021-04-04T00:00:00Z",
            "createdBy": "user",
            "modifiedBy": "admin"
        },{
            "sreType": "SLA",
            "slaRecordId":"123-1",
            "applicationId":"123",
            "applicationName": "Test",
            "associatedSlo": "test-val",
            "environment": "dev",
            "sla": "99.5",
            "slaDescription": "A test app",
            "status": "Active",
            "createdDate": "2021-04-04T00:00:00Z",
            "modifiedDate": "2021-04-04T00:00:00Z",
            "createdBy": "user",
            "modifiedBy": "admin"
        }]
         return response;
    
}
export const getSloList = async () => {

    
    //axios.get(SRE_API_BASE_URL);
    let response = [{
       "sreType": "SLO",
       "sloRecordId":"123-1",
       "applicationId":"123",
       "applicationName": "Test",
       "associatedSli": "test-val",
       "environment": "dev",
       "currentSlo": "2",
       "sloDescription": "A test app",
       "sloId" : "test-slo",
       "status": "Active",
       "createdDate": "2021-04-04T00:00:00Z",
       "modifiedDate": "2021-04-04T00:00:00Z",
       "createdBy": "user",
       "modifiedBy": "admin"
   },{
    "sreType": "SLO",
    "sloRecordId":"3333-1",
    "applicationId":"3333",
    "applicationName": "Test",
    "associatedSli": "test-val",
    "environment": "dev",
    "currentSlo": "2",
    "sloDescription": "A test app",
    "sloId" : "test-slo",
    "status": "Active",
    "createdDate": "2021-04-04T00:00:00Z",
    "modifiedDate": "2021-04-04T00:00:00Z",
    "createdBy": "user",
    "modifiedBy": "admin"
   }]
    return response;

}
export const getErrorbudgetList = async () => {

    
    //axios.get(SRE_API_BASE_URL);
    let response = [{
       "sreType": "errorbudget",
       "errorBudgetRecordId":"123-1",
       "applicationId":"123",
       "applicationName": "Test",
       "associatedSli": "test-val",
       "environment": "dev",
       "errorBudgetPercentage": "99.5",
       "reliabilityCalculationFrequency": "2",
       "reliabilityMesurementDescription": "Test failing cases",
       "status": "Active",
       "createdDate": "2021-04-04T00:00:00Z",
       "modifiedDate": "2021-04-04T00:00:00Z",
       "createdBy": "user",
       "modifiedBy": "admin"
   },{
        "sreType": "errorbudget",
        "errorBudgetRecordId":"333-1",
        "applicationId":"3333",
        "applicationName": "Test2",
        "associatedSli": "test-val1",
        "environment": "dev",
        "errorBudgetPercentage": "99.5",
        "reliabilityCalculationFrequency": "2",
        "reliabilityMesurementDescription": "Test failing cases",
        "status": "Active",
        "createdDate": "2021-04-04T00:00:00Z",
        "modifiedDate": "2021-04-04T00:00:00Z",
        "createdBy": "user",
        "modifiedBy": "admin"
   }]
    return response;

}
export const getSliList = async () => {

    
    //axios.get(SRE_API_BASE_URL);
    let response = [{
       "sreType": "SLI",
       "sliRecordId":"123-1",
       "applicationId":"123",
       "applicationName": "Test",
       "environment": "dev",
       "currentSli": "1",
       "sliDescription": "A test app",
       "sliId": "tes-id",
       "sliItemName" : "test-item",
       "status": "Active",
       "createdDate": "2021-04-04T00:00:00Z",
       "modifiedDate": "2021-04-04T00:00:00Z",
       "createdBy": "user",
       "modifiedBy": "admin"
   },{
        "sreType": "SLI",
        "sliRecordId":"123-1",
        "applicationId":"123",
        "applicationName": "Test",
        "environment": "dev",
        "currentSli": "1",
        "sliDescription": "A test app",
        "sliId": "tes-id",
        "sliItemName" : "test-item",
        "status": "Active",
        "createdDate": "2021-04-04T00:00:00Z",
        "modifiedDate": "2021-04-04T00:00:00Z",
        "createdBy": "user",
        "modifiedBy": "admin"
   }]
    return response;

}