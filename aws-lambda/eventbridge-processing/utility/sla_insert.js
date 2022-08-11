var AWS = require('aws-sdk');
const crypto = require("crypto");

'use strict'

const putSLAItem = async (event) => {
    //operation on put event
    //creating DynamoDB service object
    var ddb = new AWS.DynamoDB();
    for (var i = 0; i < event.detail.associated_slo.length; i++) {
        //extracting details from the event
        var params = {
            TableName: 'sla_config',
            Item: {
                'sla_record_id' : { S: crypto.randomBytes(16).toString("hex") },
                'application_id' : { N: event.detail.application_id.toString() },
                'environment' : { S: event.detail.environment.toString() },
                'sla_description' : { S: event.detail.sla_description.toString() },
                'sla_target' : { S: event.detail.sla_target.toString() },
                'sla_actual' : { S: event.detail.sla_actual.toString() },
                'sla_status' : { S: event.detail.sla_status.toString() },
                'associated_slo' :  { S:event.detail.associated_slo[i].toString() },
                'time' :  { S:event.time.toString() }
            }
        };
        var response = await ddb.putItem(params).promise()
            .then(function (data) {
                console.log('Insertion of SLA data for application_id: ${event.detail.application_id.toString()} successful')
            })
            .catch(function (err) {
                console.log('Error occured while inserting SLA data for application_id: ${event.detail.application_id.toString()} ${err}');
                return err;
            });
    }
}

module.exports = {
    putSLAItem
}