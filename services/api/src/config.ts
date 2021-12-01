import {EnvironmentVars} from '@serverless-template/common/src/environmentVars';

declare const process: EnvironmentVars;

export const tableName: string = process.env.TABLE_NAME || '';
export const apiEndpoint: string = process.env.API_ENDPOINT || '';
