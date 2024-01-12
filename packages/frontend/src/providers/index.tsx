import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchAuthSession } from 'aws-amplify/auth';
import { httpBatchLink, trpc } from '../api/trpc';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_APP_API_URL}/trpc`,
      async headers() {
        const token = (await fetchAuthSession()).tokens?.accessToken?.toString()
        return {
          authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
})

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default QueryProvider;