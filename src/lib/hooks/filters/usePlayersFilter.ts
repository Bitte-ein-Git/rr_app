import { Player, Room } from "../../types";

import Fuse from "fuse.js";
import { useMemo } from "react";
import { usePlayersFormContext } from "../../contexts/PlayersFormContext";

const usePlayersFilter = (rooms: Room[]) => {
	const form = usePlayersFormContext();

	return useMemo(() => {
		let results = rooms.reduce<Player[]>((a, b) => [...a, ...b.players], []);

		// Search
		if (form.getValues().query) {
			results = results.filter(player => player.name && player.name !== "no name");

			return new Fuse(results, { keys: ["name"], threshold: 0.2 })
				.search(form.getValues().query)
				.map(({ item }) => results.find(player => player.pid === item.pid)!);
		}

		// Filter
		// TODO: filter items here

		// Sort
		results = [...results].sort((a, b) => {
			switch (form.getValues().sortBy) {
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

		return form.getValues().reverseSortDirection ? results.reverse() : results;
	}, [rooms, form]);
};

export default usePlayersFilter;
