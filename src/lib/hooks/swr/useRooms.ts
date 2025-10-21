"use client";

import {
	DEFAULT_SETTINGS_REFRESHINTERVAL,
	LOCALSTORAGE_SETTINGS_REFRESHINTERVAL,
	URL_WORKER_RETROREWIND_ROOMS
} from "@/lib/constants";
import useSWR, { KeyedMutator } from "swr"; // Removed SWRConfiguration

import { Room } from "@/lib/types";
import fetcher from "@/lib/fetchers/fetcher";
import { readLocalStorageValue } from "@mantine/hooks";
import { useCallback } from "react";

// removed FetchedRoomRaw interface here

// swr hook to fetch room data via worker (fetcher handles transformation)
const useRooms = (): {
	data: Room[] | undefined; // Expects Room[] directly now
	error: unknown;
	mutate: KeyedMutator<Room[]>;
	isValidating: boolean;
	isLoading: boolean;
} => {
	// read refresh interval from localstorage
	const intervalSetting = readLocalStorageValue<number>({
		key: LOCALSTORAGE_SETTINGS_REFRESHINTERVAL,
		defaultValue: DEFAULT_SETTINGS_REFRESHINTERVAL,
	});

	// calculate refresh interval in milliseconds, disable if 0
	const refreshIntervalMs = useCallback(() => (intervalSetting > 0 ? intervalSetting * 1000 : 0), [intervalSetting]);

	// fetch room data using swr, pointing to worker url
	// Fetcher now returns Room[] directly for this URL
	const { data, error, mutate, isValidating, isLoading } = useSWR<Room[]>( // Expect Room[]
		URL_WORKER_RETROREWIND_ROOMS,
		fetcher,
		{
			refreshInterval: refreshIntervalMs(), // use dynamic refresh interval
            // removed onSuccess transformation logic
		}
	);

	// no type casting needed anymore
	return { data, error, mutate, isValidating, isLoading };
};

export default useRooms;