import { router } from "../trpc";
import { greetingRouter } from "./greeting";

const appRouter = router({
  greeting: greetingRouter,
});

type AppRouter = typeof appRouter;

export default appRouter;
export type { AppRouter };
