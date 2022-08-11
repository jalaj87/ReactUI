let AWS = require('aws-sdk');
//AWS.DynamoDB.DocumentClient('us-east-1')

let documentClient = new AWS.DynamoDB.DocumentClient();
const insertSloConfig = async (record, applicationId) => {

    let tableParams;
    tableParams = {
        FilterExpression: "#applicationId = :applicationId",
        ExpressionAttributeNames: {
            '#applicationId': 'applicationId',
        },
        ExpressionAttributeValues: {
            ':applicationId': applicationId,
        },

        TableName: 'slo_config'
    };
    let items;
    let data = [];
    items = await documentClient.scan(tableParams).promise();
    for (let item of items.Items) {
        data.push(parseInt(item.slo_record_id.split('-').pop()));
    }
    record['slo_record_id'] = applicationId + '-1';
    //console.log(data)
    if (data.length > 0) {
        record['slo_record_id'] = applicationId + '-' + (data.sort().pop() + 1);
    }
    let response = await insertRecord(record);
    return response;
};

const insertRecord = async (record) => {
    //console.log(record)
    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    var params = {
        TableName: 'slo_config',
        Item: {
            'slo_record_id': record.slo_record_id.toString(),
            'applicationId': record.applicationId.toString(),
            'applicationName': record.applicationName.toString(),
            'environment': record.environment.toString(),
            'currentSlo': record.currentSlo.toString(),
            'createdDate': record.createdDate.toString(),
            'status': record.status.toString(),
            'associatedSli': record.associatedSli.toString(),
            'modifiedDate': record.modifiedDate.toString(),
            'sloId': record.sloId.toString(),
            'createdBy': record.createdBy.toString(),
            'sloDescription': record.sloDescription.toString(),
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
            "body": JSON.stringify("Successfully inserted record into slo_config")
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
            "body": JSON.stringify("Error occured while inserting record into slo_config")
        };
        return configResponse;
    }
};

const deleteRecord = async (record_id) => {
    let tableParams;
    tableParams = {

        Key: {
            'slo_record_id': record_id
        },

        TableName: 'slo_config'
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
            "body": JSON.stringify("Successfully deleted record from slo_config")
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
            "body": JSON.stringify("Error occured while deleting record from slo_config")
        };
        return configResponse;
    }

};

module.exports = {
    insertSloConfig,
    insertRecord,
    deleteRecord
}