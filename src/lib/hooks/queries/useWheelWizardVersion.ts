import {
	LOCALSTORAGE_ABOUT_WHEELWIZARDVERSION,
	QUERY_WHEELWIZARD_VERSION,
	URL_INTERNAL_WHEELWIZARD_VERSION,
} from "../../constants";

import { WheelWizardVersionQuery } from "@/lib/types";
import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	const response: Response = await fetch(URL_INTERNAL_WHEELWIZARD_VERSION);
	return response.json();
};

const useWheelWizardVersion = (): {
	version: string | undefined;
	status: "pending" | "error" | "success";
} => {
	const [wheelWizardVersion, setWheelWizardVersion] = useLocalStorage<string | undefined>({
		key: LOCALSTORAGE_ABOUT_WHEELWIZARDVERSION,
	});

	const { data, status } = useQuery<WheelWizardVersionQuery>({
		queryKey: [QUERY_WHEELWIZARD_VERSION],
		queryFn,
		refetchInterval: false,
	});

	useEffect(() => {
		if (data?.version) {
			setWheelWizardVersion(data.version);
		}
	}, [data, setWheelWizardVersion]);

	return { version: wheelWizardVersion, status };
};

export default useWheelWizardVersion;
