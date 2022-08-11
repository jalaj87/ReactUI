var AWS = require('aws-sdk');
const crypto = require("crypto");

'use strict'

const putSLOItem = async (event) => {
    //operation on put event
    //creating DynamoDB service object
    var ddb = new AWS.DynamoDB();
    for (var i = 0; i < event.detail.associated_sli.length; i++) {
        //extracting details from the event
        var params = {
            TableName: 'slo_config',
            Item: {
                'slo_record_id' : { S: crypto.randomBytes(16).toString("hex") },
                'slo_id' : { S: event.detail.slo_id.toString() },
                'application_id' : { N: event.detail.application_id.toString() },
                'environment' : { S: event.detail.environment.toString() },
                'slo_description' : { S:event.detail.slo_description.toString() },
                'current_slo' : { S:event.detail.current_slo.toString() },
                'associated_sli' :  { S:event.detail.associated_sli[i].toString() },
                'time' :  { S:event.time.toString() }
            }
        };
        var response = await ddb.putItem(params).promise()
            .then(function (data) {
                console.log('Insertion of SLO data for application_id: ${event.detail.application_id.toString()} successful')
            })
            .catch(function (err) {
                console.log('Error occured while inserting SLO data for application_id: ${event.detail.application_id.toString()} ${err}');
                return err;
            });
    }
}

module.exports = {
    putSLOItem
}