var AWS = require('aws-sdk');
const crypto = require("crypto");

'use strict'

const putSLIItem = async (event) => {
    for (var i = 0; i < event.detail.sli_item.length; i++) {
        //operation on put event
        //creating DynamoDB service object
        var ddb = new AWS.DynamoDB();
        //extracting details from the event
        var params = {
            TableName: 'sli_history',
            Item: {
                'sli_record_id' : { S: crypto.randomBytes(16).toString("hex") },
                'sli_id' : { S: event.detail.sli_id.toString() },
                'application_id' : { N: event.detail.application_id.toString() },
                'environment' : { S: event.detail.environment.toString() },
                'sli_description' : { S:event.detail.sli_description.toString() },
                'sli_item_name' : { S:event.detail.sli_item[i].sli_item_name.toString() },
                'current_sli' : { S:event.detail.sli_item[i].current_sli.toString() },
                'sli_status' :  { S:event.detail.sli_item[i].sli_status.toString() },
                'time' :  { S:event.time.toString() }
            }
        };
        var response = await ddb.putItem(params).promise()
            .then(function (data) {
                console.log('Insertion of SLI data for application_id: ${event.detail.application_id.toString()} successful')
            })
            .catch(function (err) {
                console.log('Error occured while inserting SLI data for application_id: ${event.detail.application_id.toString()} ${err}');
                return err;
            });
    }
}

module.exports = {
    putSLIItem
}