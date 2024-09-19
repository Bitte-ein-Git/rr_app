import {
	LOCALSTORAGE_ABOUT_RETROREWINDVERSION,
	QUERY_RETROREWIND_VERSION,
	URL_INTERNAL_RETROREWIND_VERSION,
} from "../../constants";

import { RetroRewindVersionQuery } from "@/lib/types";
import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	const response: Response = await fetch(URL_INTERNAL_RETROREWIND_VERSION);
	return response.json();
};

const useRetroRewindVersion = (): {
	version: string | undefined;
	status: "pending" | "error" | "success";
} => {
	const [retroRewindVersion, setRetroRewindVersion] = useLocalStorage<string | undefined>({
		key: LOCALSTORAGE_ABOUT_RETROREWINDVERSION,
	});

	const { data, status } = useQuery<RetroRewindVersionQuery>({
		queryKey: [QUERY_RETROREWIND_VERSION],
		queryFn,
		refetchInterval: false,
	});

	useEffect(() => {
		if (data?.version) {
			setRetroRewindVersion(data.version);
		}
	}, [data, setRetroRewindVersion]);

	return { version: retroRewindVersion, status };
};

export default useRetroRewindVersion;
