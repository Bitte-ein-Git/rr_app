"use client";

import { LOCALSTORAGE_MIIS, URL_WORKER_MII } from "@/lib/constants"; // using worker mii url
import { useCallback, useEffect } from "react";

import { Mii } from "@/lib/types";
import fetcher from "@/lib/fetchers/fetcher";
import { useLocalStorage } from "@mantine/hooks";
import useSWRImmutable from "swr/immutable"; // using immutable as mii data rarely changes for a fc

// swr hook to fetch mii image data via worker, caches result in localstorage
const useMii = (fc: string, data: string): string | undefined => {
	// localstorage cache for miis
	const [miis, setMiis] = useLocalStorage<{ [key: string]: string }>({
		key: LOCALSTORAGE_MIIS,
		defaultValue: {},
	});

	// construct worker url only if mii is not in localstorage cache
	const key = useCallback(() => (!miis[fc] ? `${URL_WORKER_MII}?data=${encodeURIComponent(data)}` : null), [fc, data, miis]);

	// fetch mii data using swr immutable fetcher
	const { data: miiData } = useSWRImmutable<Mii>(key, fetcher);

	// effect to update localstorage cache when new mii data is fetched
	useEffect(() => {
		if (!miis[fc] && miiData?.imageData) {
			setMiis(currentMiis => ({ ...currentMiis, [fc]: miiData.imageData }));
		}
	}, [fc, miis, setMiis, miiData]);

	// return mii image data from localstorage cache
	return miis[fc];
};

export default useMii;

