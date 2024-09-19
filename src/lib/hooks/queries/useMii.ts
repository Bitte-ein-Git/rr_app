import { MiiQuery, Player } from "@/lib/types";
import { QUERY_MII, URL_INTERNAL_MII } from "@/lib/constants";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

const useMii = (
	player: Player
): {
	imageData: string | undefined;
	status: "pending" | "error" | "success";
} => {
	const queryFn = useCallback(async () => {
		const response: Response = await fetch(`${URL_INTERNAL_MII}?data=${encodeURIComponent(player.mii[0].data)}`);
		return response.json();
	}, [player.mii]);

	const { data, status } = useQuery<MiiQuery>({
		queryKey: [QUERY_MII, player.fc],
		queryFn,
	});

	return { imageData: data?.imageData, status };
};

export default useMii;
