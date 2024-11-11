"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useState } from "react";

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 6,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            alert(query.meta?.errorMessage);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
