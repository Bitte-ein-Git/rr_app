"use client";

import { LOCALSTORAGE_MIIS, URL_INTERNAL_MII } from "@/lib/constants";
import { useCallback, useEffect } from "react";

import { Mii } from "@/lib/types";
import fetcher from "@/lib/fetchers/fetcher";
import { useLocalStorage } from "@mantine/hooks";
import useSWRImmutable from "swr/immutable";

const useMii = (fc: string, data: string): string | undefined => {
	const [miis, setMiis] = useLocalStorage<{ [key: string]: string }>({ key: LOCALSTORAGE_MIIS, defaultValue: {} });

	const key = useCallback(() => (!miis[fc] ? `${URL_INTERNAL_MII}?data=${data}` : null), [fc, data, miis]);

	const { data: mii } = useSWRImmutable<Mii>(key, fetcher);

	useEffect(() => {
		if (!miis[fc] && mii) {
			setMiis(miis => ({ ...miis, [fc]: mii.imageData }));
		}
	}, [fc, miis, setMiis, mii]);

	return miis[fc];
};

export default useMii;
