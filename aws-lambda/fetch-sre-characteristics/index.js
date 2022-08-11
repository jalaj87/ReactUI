const getConfig = require('./utility/getConfig');
const sloConfig = require('./utility/sloConfig');
const slaConfig = require('./utility/slaConfig');
const ebConfig = require('./utility/ebConfig');

exports.handler = async (event) => {
  let response = {}
  //dummy

  /*let req = {"environment":"dev","currentSlo":"2","createdDate":"2021-04-16T00:00:00Z","status":"Active","associatedSli":"test-val-2","modifiedDate":"2021-04-16T00:00:00Z","sloId":"test-val-2","createdBy":"user","applicationName":"Test","sloDescription":"SRE POC","modifiedBy":"admin","applicationId":"12345"}
  let body = JSON.stringify(req)
  //response = await slaConfig.getAllConfigData("sla")
  //await sloConfig.insertSloConfig(req,req.applicationId)
  await sloConfig.deleteRecord('12345-3')*/

  //dummy
  console.log("request event: " + JSON.stringify(event));
  if (event.httpMethod == 'GET') {
    if (event.queryStringParameters && event.queryStringParameters.sreType) {
      let application_id = "";
      if (event.queryStringParameters.application_id) {
        application_id = event.queryStringParameters.application_id.toString();
      }
      if ((event.queryStringParameters.sreType).toLowerCase() == "sla") {
        response = await getConfig.getAllConfigData("sla_config", (application_id))
      } else if ((event.queryStringParameters.sreType).toLowerCase() == "slo") {
        response = await getConfig.getAllConfigData("slo_config", (application_id))
      } else if ((event.queryStringParameters.sreType).toLowerCase() == "errorbudget") {
        response = await getConfig.getAllConfigData("error_budget", (application_id))
      } else if ((event.queryStringParameters.sreType).toLowerCase() == "sli") {
        response = await getConfig.getAllConfigData("sli_history", (application_id))
      }
    }

  }


  if (event.httpMethod == 'POST') {
    if (event.body) {
      let record = JSON.parse(event.body)
      if (event.queryStringParameters.isUpdate.toString() == 'false') {
        if (event.queryStringParameters.sreType == 'slo') {
          response = await sloConfig.insertSloConfig(record, record.applicationId)
        }
        else if (event.queryStringParameters.sreType == 'sla') {
          response = await slaConfig.insertSlaConfig(record, record.applicationId)
        }
        else if (event.queryStringParameters.sreType == 'errorbudget') {
          response = await ebConfig.insertEbConfig(record, record.applicationId)
        }
      }
      if (event.queryStringParameters.isUpdate.toString() == 'true') {
        if (event.queryStringParameters.sreType == 'slo') {
          response = await sloConfig.insertRecord(record)
        }
        else if (event.queryStringParameters.sreType == 'sla') {
          response = await slaConfig.insertRecord(record)
        }
        else if (event.queryStringParameters.sreType == 'errorbudget') {
          response = await ebConfig.insertRecord(record)
        }
      }
    }
  }

  if (event.httpMethod == 'DELETE') {
    if (event.queryStringParameters && event.queryStringParameters.sreType && event.queryStringParameters.record_id) {
      if (event.queryStringParameters.sreType == 'slo') {
        response = await sloConfig.deleteRecord(event.queryStringParameters.record_id)
      }
      else if (event.queryStringParameters.sreType == 'sla') {
        response = await slaConfig.deleteRecord(event.queryStringParameters.record_id)
      }
      else if (event.queryStringParameters.sreType == 'errorbudget') {
        response = await ebConfig.deleteRecord(event.queryStringParameters.record_id)
      }
    }
  }

  console.log(response)
  console.log("response: " + JSON.stringify(response))
  return response;
};
