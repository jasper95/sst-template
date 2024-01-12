import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@sst-template/core/trpc/router";
export { httpBatchLink } from '@trpc/client'

export const trpc = createTRPCReact<AppRouter>();
