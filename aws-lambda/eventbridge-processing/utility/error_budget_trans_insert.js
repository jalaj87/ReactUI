var AWS = require('aws-sdk');
const crypto = require("crypto");

'use strict'

const putErrorBudgetTransItem = async (event) => {
    //operation on put event
    //creating DynamoDB service object
    var ddb = new AWS.DynamoDB();
    //extracting details from the event
    var params = {
        TableName: 'error_budget_trans',
        Item: {
            'error_budget_trans_record_id' : { S: crypto.randomBytes(16).toString("hex") },
            'application_id' : { N: event.detail.application_id.toString() },
            'environment' : { S: event.detail.environment.toString() },
            'associated_error_budget' : { S: event.detail.associated_error_budget.toString() },
            'error_budget_used' : { S: event.detail.error_budget_used.toString() },
            'error_budget_metric' : { S: event.detail.error_budget_metric.toString() },
            'error_budget_met' : { S: event.detail.error_budget_met.toString() },
            'time' :  { S:event.time.toString() }
            }
        };
        var response = await ddb.putItem(params).promise()
            .then(function (data) {
                console.log('Insertion of Error Budget Trans data for application_id: ${event.detail.application_id.toString()} successful')
            })
            .catch(function (err) {
                console.log('Error occured while inserting Error Budget Trans data for application_id: ${event.detail.application_id.toString()} ${err}');
                return err;
            });
    }
}

module.exports = {
    putErrorBudgetItem
}