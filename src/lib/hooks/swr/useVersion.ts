"use client";

import { Application, Version } from "@/lib/types";
import { URL_INTERNAL_APP_VERSION, URL_INTERNAL_RETROREWIND_VERSION, URL_INTERNAL_WHEELWIZARD_VERSION } from "@/lib/constants";
import useSWR, { KeyedMutator } from "swr";

import fetcher from "@/lib/fetchers/fetcher";

const applications: { [key in Application]: string } = {
	app: URL_INTERNAL_APP_VERSION,
	"retro-rewind": URL_INTERNAL_RETROREWIND_VERSION,
	"wheel-wizard": URL_INTERNAL_WHEELWIZARD_VERSION,
};

const useVersion = (
	application: Application
): {
	data: Version | undefined;
	error: unknown;
	mutate: KeyedMutator<Version>;
	isValidating: boolean;
	isLoading: boolean;
} => {
	return useSWR<Version>(applications[application], fetcher);
};

export default useVersion;
