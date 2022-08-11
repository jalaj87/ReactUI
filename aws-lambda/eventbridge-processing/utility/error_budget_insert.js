var AWS = require('aws-sdk');
const crypto = require("crypto");

'use strict'

const putErrorBudgetItem = async (event) => {
    //operation on put event
    //creating DynamoDB service object
    var ddb = new AWS.DynamoDB();
    //extracting details from the event
    var params = {
        TableName: 'error_budget',
        Item: {
            'error_budget_record_id' : { S: crypto.randomBytes(16).toString("hex") },
            'application_id' : { N: event.detail.application_id.toString() },
            'environment' : { S: event.detail.environment.toString() },
            'reliability_description' : { S: event.detail.reliability_description.toString() },
            'reliability_calculation_frequency' : { S: event.detail.reliability_calculation_frequency.toString() },
            'error_budget_percentage' : { S: event.detail.error_budget_percentage.toString() },
            'error_budget' : { S: event.detail.error_budget.toString() },
            'time' :  { S:event.time.toString() }
            }
        };
        var response = await ddb.putItem(params).promise()
            .then(function (data) {
                console.log('Insertion of Error Budget data for application_id: ${event.detail.application_id.toString()} successful')
            })
            .catch(function (err) {
                console.log('Error occured while inserting Error Budget data for application_id: ${event.detail.application_id.toString()} ${err}');
                return err;
            });
    }
}

module.exports = {
    putErrorBudgetItem
}