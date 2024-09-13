import { FetchStatus, Query, QueryKey, QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import {
	LOCALSTORAGE_SETTINGS_REFRESHINTERVAL,
	QUERY_RETROREWIND_ROOMS,
	URL_INTERNAL_RETROREWIND_ROOMS,
} from "../../constants";

import { Room } from "../../types";
import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";

const queryFn = async () => {
	const response: Response = await fetch(URL_INTERNAL_RETROREWIND_ROOMS);
	return response.json();
};

const useRetroRewindRooms = (): {
	rooms: Room[] | undefined;
	error: Error | null;
	status: "pending" | "error" | "success";
	fetchStatus: FetchStatus;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Room[], Error>>;
} => {
	const [refreshInterval] = useLocalStorage<number>({ key: LOCALSTORAGE_SETTINGS_REFRESHINTERVAL });

	const refetchInterval = useCallback(
		(query: Query<Room[], Error, Room[], QueryKey>): number | false | undefined => {
			try {
				if (query.state.status === "success" && refreshInterval > 0) {
					return refreshInterval * 1000;
				}
			} catch {
				return false;
			}

			return false;
		},
		[refreshInterval]
	);

	const {
		data: rooms,
		error,
		status,
		fetchStatus,
		refetch,
	} = useQuery<Room[]>({
		queryKey: [QUERY_RETROREWIND_ROOMS],
		queryFn,
		refetchInterval,
	});

	return { rooms, error, status, fetchStatus, refetch };
};

export default useRetroRewindRooms;
