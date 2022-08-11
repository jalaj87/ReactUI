let AWS = require('aws-sdk');
//AWS.DynamoDB.DocumentClient('us-east-1')

let documentClient = new AWS.DynamoDB.DocumentClient();
const insertSlaConfig = async (record, applicationId) => {

    let tableParams;
    tableParams = {
        FilterExpression: "#applicationId = :applicationId",
        ExpressionAttributeNames: {
            '#applicationId': 'applicationId',
        },
        ExpressionAttributeValues: {
            ':applicationId': applicationId,
        },

        TableName: 'sla_config'
    };
    let items;
    let data = [];
    items = await documentClient.scan(tableParams).promise();
    for (let item of items.Items) {
        data.push(parseInt(item.sla_record_id.split('-').pop()));
    }
    record['sla_record_id'] = applicationId + '-1';
    //console.log(data)
    if (data.length > 0) {
        record['sla_record_id'] = applicationId + '-' + (data.sort().pop() + 1);
    }
    let response = await insertRecord(record);
    return response;
};

const insertRecord = async (record) => {
    //console.log(record)
    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    var params = {
        TableName: 'sla_config',
        Item: {
            'sla_record_id': record.sla_record_id.toString(),
            'applicationId': record.applicationId.toString(),
            'applicationName': record.applicationName.toString(),
            'environment': record.environment.toString(),
            'sla': record.sla.toString(),
            'createdDate': record.createdDate.toString(),
            'status': record.status.toString(),
            'associatedSlo': record.associatedSlo.toString(),
            'modifiedDate': record.modifiedDate.toString(),
            'createdBy': record.createdBy.toString(),
            'slaDescription': record.slaDescription.toString(),
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
            "body": JSON.stringify("Successfully inserted record into sla_config")
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
            "body": JSON.stringify("Error occured while inserting record into sla_config")
        };
        return configResponse;
    }
};

const deleteRecord = async (record_id) => {
    let tableParams;
    tableParams = {

        Key: {
            'sla_record_id': record_id
        },

        TableName: 'sla_config'
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
            "body": JSON.stringify("Successfully deleted record from sla_config")
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
            "body": JSON.stringify("Error occured while deleting record from sla_config")
        };
        return configResponse;
    }

};

module.exports = {
    insertSlaConfig,
    insertRecord,
    deleteRecord
}