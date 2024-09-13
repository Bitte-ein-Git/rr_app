import { LOCALSTORAGE_ABOUT_APPVERSION, QUERY_APP_VERSION, URL_INTERNAL_APP_VERSION } from "../../constants";

import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	const response: Response = await fetch(URL_INTERNAL_APP_VERSION);
	return response.json();
};

const useAppVersion = (): {
	version: string | undefined;
	status: "pending" | "error" | "success";
} => {
	const [appVersion, setAppVersion] = useLocalStorage<string | undefined>({
		key: LOCALSTORAGE_ABOUT_APPVERSION,
	});

	const { data, status } = useQuery({
		queryKey: [QUERY_APP_VERSION],
		queryFn,
		refetchInterval: false,
	});

	useEffect(() => {
		if (data?.version) {
			setAppVersion(data.version);
		}
	}, [data, setAppVersion]);

	return { version: appVersion, status };
};

export default useAppVersion;
