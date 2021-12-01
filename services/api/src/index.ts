import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {logger} from '@serverless-template/common/src/logger/logger';
import {tableName, apiEndpoint} from './config';
import {DynamoDBClient, QueryCommand, QueryCommandInput, QueryCommandOutput} from '@aws-sdk/client-dynamodb';
import axios, {AxiosResponse} from 'axios';

const dynamodb = new DynamoDBClient({region: 'eu-west-1'});

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    logger.info('Event', {event});
    const {requestContext, headers, pathParameters} = event;

    if (!pathParameters || !pathParameters['id']){
        return {
            statusCode: 404,
            ...headers,
            body: JSON.stringify({
                id: requestContext.requestId,
                message: 'Path Parameter not found.'
            })
        };
    }

    const input: QueryCommandInput = {
        TableName: tableName,
        KeyConditionExpression: '#pk = :pk and #sk = :sk',
        ExpressionAttributeNames:{
            '#pk': 'pk',
            '#sk': 'sk'
        },
        ExpressionAttributeValues: {
            ':pk': {
                S: 'type#Case'
            },
            ':sk': {
                S: `started#${1}`
            }
        }
    };

    const dynamoResponse: QueryCommandOutput = await dynamodb.send(new QueryCommand(input));

    const axiosResponse: AxiosResponse = await axios.get(apiEndpoint);

    return {
        statusCode: 200,
        ...headers,
        body: JSON.stringify({
            id: requestContext.requestId,
            dynamodb: dynamoResponse.Items,
            apiResponse: axiosResponse.data
        })
    };
};
