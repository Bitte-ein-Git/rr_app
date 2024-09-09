"use client";

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

interface Props {
	children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: Props) => {
	return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
