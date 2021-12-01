# Seed Data and Mock Service - Demo

## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>


## Info

This handles deployment of multiple stacks with Serverless Framework Stacks using 
Yarn workspaces and Lerna. Dependencies between stacks are maintained with lerna 
through the package dependencies in the package.json files. Stacks are deployed 
in parallel, while maintaining the dependencies order.

- When development environment is deployed...
    - services are configured to point to resources that mock external (third party) apis
    - database is ingested with seed data
    - database is deleted on cloudformation stack removal

- When production environment is deploy...
    - services are configured to point to external (third party) apis
    - database is not ingested with seed data
    - database is retained on cloudformation stack removal


## File Structure
```
└─ services/
    ├─ config/                  - shared config & dependencies for services
    └─ common/                  - deploys dynamodb table
        └─ src/                 - common code across services
    └─ external-api/            - represents third party apis
        └─ src/                 - scripts for lambda function
    └─ mock-external-api/       - mocks third party apis
        └─ src/                 - scripts for lambda function
    └─ api/                     - deploys client facing api
        └─ src/                 - queries dynamodb & (mock-)external-api
    └─ config.yml               - shared serverless config for services
```

## Development

### Install:
```
yarn install
```

### Deploy:
- To deploy development environment (w/ mock-external-api)
```
yarn run deploy:dev
```

- To deploy production environment (w/ external-api)
```
yarn run deploy:prod --stage prod
```

### Test:
- To test use a number between 1 - 6 (from services/common/insert-items.js 'sk' fields)
```bash
curl -X GET https://<API_ID>.<REGION>.execute-api.amazonaws.com/<number>
```

### Remove:
- To remove development environment
```
yarn run remove
```

- To remove production environment
```
yarn run remove --stage prod
```
