"use client";

import { Application, Version } from "@/lib/types";
import {
	URL_WORKER_APP_VERSION, // using worker url
	URL_WORKER_RETROREWIND_VERSION, // using worker url
	URL_WORKER_WHEELWIZARD_VERSION // using worker url
} from "@/lib/constants";
import useSWR, { KeyedMutator } from "swr";

import fetcher from "@/lib/fetchers/fetcher";

// map application type to worker url
const applicationUrls: { [key in Application]: string } = {
	app: URL_WORKER_APP_VERSION, // worker url for app version
	"retro-rewind": URL_WORKER_RETROREWIND_VERSION, // worker url for rr version
	"wheel-wizard": URL_WORKER_WHEELWIZARD_VERSION, // worker url for ww version
};

// swr hook to fetch application versions via worker
const useVersion = (
	application: Application
): {
	data: Version | undefined;
	error: unknown;
	mutate: KeyedMutator<Version>;
	isValidating: boolean;
	isLoading: boolean;
} => {
	// fetch data using swr and the corresponding worker url
	return useSWR<Version>(applicationUrls[application], fetcher, {
        // optional: configure revalidation intervals if needed, worker should handle caching primarily
         refreshInterval: 3600 * 1000 // revalidate every hour
    });
};

export default useVersion;
