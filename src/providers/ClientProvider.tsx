import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ClientProvider = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ClientProvider;
