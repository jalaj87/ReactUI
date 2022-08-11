import axios from 'axios';
const SRE_API_BASE_URL = "http://localhost:8080/api/v1/sre";

export const getSreList = async () => {

    
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
