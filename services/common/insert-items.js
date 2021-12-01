'use strict';

const awsProvider = serverless.getProvider('aws');
const Converter = require('aws-sdk/clients/dynamodb').Converter;

const main = async () => {
    if (serverless.service.provider.stage === 'prod') {
        return;
    }

    const stackResources = await listStackResources();
    const tableName = getPhysicalId(stackResources, 'DynamoTable');

    await awsProvider.request('DynamoDB', 'batchWriteItem', {
        RequestItems: {
            [tableName]: [
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#1',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            patientId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                            tenantId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            caseId: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#2',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: '2afb9edf-0d86-4069-8bbb-6a4b66bd91c8',
                            patientId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                            tenantId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            caseId: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#3',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            patientId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                            tenantId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            caseId: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#4',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            patientId: '2afb9edf-0d86-4069-8bbb-6a4b66bd91c8',
                            tenantId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            caseId: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#5',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            patientId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                            tenantId: '2afb9edf-0d86-4069-8bbb-6a4b66bd91c8',
                            caseId: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'type#Case',
                            sk: 'start#6',
                            data: 'visited#2021-05-14T10:00:00Z',
                            practionerId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            patientId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                            tenantId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            caseId: '2afb9edf-0d86-4069-8bbb-6a4b66bd91c8',
                        })
                    }
                },
            ]
        }
    });
};

const listStackResources = async (resources, nextToken) => {
    resources = resources || [];
    const response = await awsProvider.request('CloudFormation', 'listStackResources', {
        StackName: awsProvider.naming.getStackName(),
        NextToken: nextToken,
    });
    resources.push(...response.StackResourceSummaries);

    if (response.NextToken) {
        return listStackResources(resources, response.NextToken);
    }

    return resources;
};

const getPhysicalId = (stackResources, logicalId) => {
    return stackResources.find(r => r.LogicalResourceId === logicalId).PhysicalResourceId || '';
};

main()
    .catch(error => {
        console.error(error);
        throw error;
    });
