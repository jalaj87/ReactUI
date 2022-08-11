let AWS = require('aws-sdk');
//AWS.DynamoDB.DocumentClient('us-east-1')

let documentClient = new AWS.DynamoDB.DocumentClient();
const insertEbConfig = async (record, applicationId) => {

    let tableParams;
    tableParams = {
        FilterExpression: "#applicationId = :applicationId",
        ExpressionAttributeNames: {
            '#applicationId': 'applicationId',
        },
        ExpressionAttributeValues: {
            ':applicationId': applicationId,
        },

        TableName: 'error_budget'
    };
    let items;
    let data = [];
    items = await documentClient.scan(tableParams).promise();
    for (let item of items.Items) {
        data.push(parseInt(item.error_budget_record_id.split('-').pop()));
    }
    record['error_budget_record_id'] = applicationId + '-1';
    //console.log(data)
    if (data.length > 0) {
        record['error_budget_record_id'] = applicationId + '-' + (data.sort().pop() + 1);
    }
    let response = await insertRecord(record);
    return response;
};

const insertRecord = async (record) => {
    //console.log(record)
    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    var params = {
        TableName: 'error_budget',
        Item: {
            'error_budget_record_id': record.error_budget_record_id.toString(),
            'applicationId': record.applicationId.toString(),
            'applicationName': record.applicationName.toString(),
            'environment': record.environment.toString(),
            'reliabilityCalculationFrequency': record.reliabilityCalculationFrequency.toString(),
            'createdDate': record.createdDate.toString(),
            'status': record.status.toString(),
            'associatedSli': record.associatedSli.toString(),
            'modifiedDate': record.modifiedDate.toString(),
            'errorBudgetPercentage': record.errorBudgetPercentage.toString(),
            'createdBy': record.createdBy.toString(),
            'reliabilityMesurementDescription': record.reliabilityMesurementDescription.toString(),
            'modifiedBy': record.modifiedBy.toString()
        }
    };
    //console.log(params.Item)

    // Call DynamoDB to add the item to the table
    try {
        await documentClient.put(params).promise();
        let configResponse = {
            "statusCode": 200,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": process.env.SRE_CONFIG_URL,
                "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST"
            },
            "body": JSON.stringify("Successfully inserted record into error_budget")
        };
        return configResponse;
    } catch (e) {
        console.log(e);
        let configResponse = {
            "statusCode": 500,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": process.env.SRE_CONFIG_URL,
                "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST"
            },
            "body": JSON.stringify("Error occured while inserting record into error_budget")
        };
        return configResponse;
    }
};

const deleteRecord = async (record_id) => {
    let tableParams;
    tableParams = {

        Key: {
            'error_budget_record_id': record_id
        },

        TableName: 'error_budget'
    };


    console.log("Attempting a conditional delete...");
    try {
        await documentClient.delete(tableParams).promise();
        let configResponse = {
            "statusCode": 200,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": process.env.SRE_CONFIG_URL,
                "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST"
            },
            "body": JSON.stringify("Successfully deleted record from error_budget")
        };
        return configResponse;
    } catch (e) {
        console.log(e);
        let configResponse = {
            "statusCode": 500,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": process.env.SRE_CONFIG_URL,
                "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST"
            },
            "body": JSON.stringify("Error occured while deleting record from error_budget")
        };
        return configResponse;
    }

};

module.exports = {
    insertEbConfig,
    insertRecord,
    deleteRecord
}