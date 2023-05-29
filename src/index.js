var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let responseBody = ""
    let statusCode = 0
    
    let {id, seriename, season, episode_qty} = JSON.parse(event.body);
    
    const params = {
        TableName : 'dioapi_series',
        Item: {
            id: id,
            seriename: seriename,
            season: season,
            episode_qty: episode_qty
        }
    }
    
    try {
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Inserted serie successfull!');
        
    } catch (err) {
        statusCode = 200;
        responseBody = JSON.stringify(err);
    }
    
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    return response;
};