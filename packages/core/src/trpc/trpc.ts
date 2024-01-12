import { initTRPC } from '@trpc/server';
export  { awsLambdaRequestHandler, CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;