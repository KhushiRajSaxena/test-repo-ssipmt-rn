const { dynamoClient, SESSIONCHAT } = require("./../constants/config");


const sendMessage = async ({sessionName, userName, ts, message, replyTo}) => {
    console.log(sessionName)
    const params = {
        TableName: SESSIONCHAT,
        Item: {
            sessionName,
            userName,
            ts,
            message,
            replyTo: replyTo ? replyTo : "",
        },
        ConditionExpression: "attribute_not_exists(id)",
        ReturnValues: "ALL_OLD",
    };
    const response = await dynamoClient.put(params).promise();
    return response;
}

const getMessageListBySessionName = async ({sessionName}) => {
    const params = {
        TableName: SESSIONCHAT,
        KeyConditionExpression: "sessionName = :sessionName",
        ExpressionAttributeValues: {
            ":sessionName": sessionName,
        },
    };

    const response = await dynamoClient.query(params).promise();
    return response.Items;
}

module.exports = {
    sendMessage, getMessageListBySessionName
}