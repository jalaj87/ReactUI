let AWS = require('aws-sdk');

const getAllConfigData = async (table, application_id) => {
    let documentClient = new AWS.DynamoDB.DocumentClient();
    let tableParams, sreData = {};
    console.log(table)
    if (!(application_id === "")) {
        tableParams = {
            FilterExpression: "#applicationId = :applicationId",
            ExpressionAttributeNames: {
                '#applicationId': 'applicationId',
            },
            ExpressionAttributeValues: {
                ':applicationId': application_id,
            },
            TableName: table
        };
    }
    else {
        tableParams = {

            TableName: table
        };
    }

    try {
        let items;
        let data = [];
        items = await documentClient.scan(tableParams).promise();
        for (let item of items.Items) {
            data.push(item);
        }
        if (data.length > 0) {
            sreData = data;
        }
        let configResponse = {
            "statusCode": 200,
            "isBase64Encoded": false,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": process.env.SRE_CONFIG_URL,
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            },
            "body": JSON.stringify(sreData)
        }
        return configResponse;
    } catch (err) {
        console.error(`Error occured while fetching the characteristics from dynamoDB table: ${table}, error: ${err}`)
    }
}
module.exports = {
    getAllConfigData
}