import { QUERY_MII, URL_INTERNAL_MII } from "@/lib/constants";

import { Player } from "@/lib/types";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

const useMii = (
	player: Player
): {
	url: string | undefined;
	status: "pending" | "error" | "success";
} => {
	const queryFn = useCallback(async () => {
		const response: Response = await fetch(`${URL_INTERNAL_MII}?data=${encodeURIComponent(player.mii[0].data)}`);
		return response.json();
	}, [player.mii]);

	const { data: mii, status } = useQuery<{ url: string }>({
		queryKey: [QUERY_MII, player.fc],
		queryFn,
	});

	console.log(mii);

	return { url: mii?.url ?? "", status };
};

export default useMii;
