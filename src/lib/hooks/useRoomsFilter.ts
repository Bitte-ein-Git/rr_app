import { Player, Room } from "../types";

import Fuse from "fuse.js";
import { average } from "../util";
import { useMemo } from "react";
import { useRoomsFormContext } from "../form-contexts/RoomsFormContext";

interface SimpleRoom {
	id: string;
	players: Player[];
}

const useRoomsFilter = (rooms: Room[]) => {
	const form = useRoomsFormContext();

	return useMemo(() => {
		let results: Room[] = rooms;

		// Search query
		if (form.getValues().query) {
			results = new Fuse(results, { keys: ["players.name", "players.fc"], threshold: 0.4 })
				.search(form.getValues().query)
				.map(result => rooms.find(room => room.id === result.item.id)!);
		}

		// Filter
		// TODO: filter items here

		// Sort
		results = [...results].sort((a, b) => {
			switch (form.getValues().sortProperty) {
				case "id":
					return a.id.localeCompare(b.id);
				case "created":
					return new Date(b.created).getTime() - new Date(a.created).getTime();
				case "players":
					return Object.keys(a.players).length - Object.keys(b.players).length;
				case "ev":
					return average(a.players.map(p => parseInt(p.ev))) - average(b.players.map(p => parseInt(p.ev)));
				case "eb":
					return average(a.players.map(p => parseInt(p.eb))) - average(b.players.map(p => parseInt(p.eb)));
				default:
					return 0;
			}
		});

		return form.getValues().sortDescending ? results.reverse() : results;
	}, [rooms, form]);
};

export default useRoomsFilter;
