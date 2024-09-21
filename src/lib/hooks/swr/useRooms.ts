"use client";

import { LOCALSTORAGE_SETTINGS_REFRESHINTERVAL, URL_INTERNAL_RETROREWIND_ROOMS } from "@/lib/constants";
import useSWR, { KeyedMutator } from "swr";

import { Room } from "@/lib/types";
import fetcher from "@/lib/fetchers/fetcher";
import { readLocalStorageValue } from "@mantine/hooks";
import { useCallback } from "react";

const useRooms = (): {
	data: Room[] | undefined;
	error: unknown;
	mutate: KeyedMutator<Room[]>;
	isValidating: boolean;
	isLoading: boolean;
} => {
	const interval = readLocalStorageValue<number>({ key: LOCALSTORAGE_SETTINGS_REFRESHINTERVAL });

	const refreshInterval = useCallback(() => interval * 1000, [interval]);

	return useSWR<Room[]>(URL_INTERNAL_RETROREWIND_ROOMS, fetcher, {
		refreshInterval,
	});
};

export default useRooms;
