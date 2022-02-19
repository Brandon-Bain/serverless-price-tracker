import type { AWS } from '@serverless/typescript';

const region: AWS['provider']['region'] =
  "${opt:region, 'us-east-1'}" as AWS['provider']['region'];

const functions: AWS['functions'] = {
  testhandler: {
    handler: 'src/handlers/priceCheck.handler',
    events: [{ schedule: { rate: ['rate(1 minute)'] } }],
  },
};

const serverlessConfig: AWS = {
  service: 'serverless-price-tracker',
  provider: {
    name: 'aws',
    stage: "${opt:stage, 'dev'}",
    runtime: 'nodejs14.x',
    region,
    environment: {
      ENV: '${self:provider.stage}',
    },
  },
  custom: {
    prune: { automatic: true, number: 2 },
  },
  functions,
  plugins: ['serverless-offline', 'serverless-prune-plugin'],
};

module.exports = serverlessConfig;
