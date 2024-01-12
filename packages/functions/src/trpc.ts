import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import appRouter from '@sst-template/core/trpc/router'
import { awsLambdaRequestHandler, CreateAWSLambdaContextOptions } from '@sst-template/core/trpc/trpc'

function createContext({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithJWTAuthorizer>) {
  return {
    event: event,
    apiVersion: (event as { version?: string }).version ?? '1.0',
    user: event.requestContext.authorizer.jwt.claims.sub,
  };
}

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});