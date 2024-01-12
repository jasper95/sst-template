import { publicProcedure, router } from "../trpc";
import { z } from 'zod';

export const greetingRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => `Hello, ${input.name}!`),
});