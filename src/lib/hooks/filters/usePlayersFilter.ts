"use client";

import { Player, Room } from "../../types";

import Fuse from "fuse.js";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const usePlayersFilter = (data: Room[] | undefined) => {
	const searchParams = useSearchParams();

	return useMemo(() => {
		if (!data) return [];

		let players: Player[] = data.reduce<Player[]>((a, b) => [...a, ...b.players], []);

		console.log(players);

		// Search
		if (searchParams.get("query")) {
			players = players.filter(player => player.name && player.name !== "no name");

			return new Fuse(players, { keys: ["name"], threshold: 0.2 })
				.search(searchParams.get("query") as string)
				.map(({ item }) => players.find(player => player.pid === item.pid)!);
		}

		// Filter
		// TODO: filter rooms here

		// Sort
		players = [...players].sort((a, b) => {
			switch (searchParams.get("sortBy")) {
				case "name":
					return a.name.localeCompare(b.name);
				case "vr":
					return (
						(!a.ev ? Number.NEGATIVE_INFINITY : Number(a.ev)) - (!b.ev ? Number.NEGATIVE_INFINITY : Number(b.ev))
					);
				case "br":
					return (
						(!a.eb ? Number.NEGATIVE_INFINITY : Number(a.eb)) - (!b.eb ? Number.NEGATIVE_INFINITY : Number(b.eb))
					);
				default:
					return 0;
			}
		});

		return searchParams.get("reverse") === "true" ? players.reverse() : players;
	}, [data, searchParams]);
};

export default usePlayersFilter;
