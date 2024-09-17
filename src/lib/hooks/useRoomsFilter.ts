import { Room } from "../types";
import { average } from "../util";
import { useMemo } from "react";
import { useRoomsFormContext } from "../form-contexts/RoomsFormContext";

const useRoomsFilter = (rooms: Room[]) => {
	const form = useRoomsFormContext();

	return useMemo(() => {
		let results: Room[] = rooms;

		// Filter
		// TODO: filter items here

		// Sort
		results = [...results].sort((a, b) => {
			switch (form.getValues().sortBy) {
				case "roomName":
					return a.id.localeCompare(b.id);
				case "lifetime":
					return new Date(b.created).getTime() - new Date(a.created).getTime();
				case "playerCount":
					return Object.keys(a.players).length - Object.keys(b.players).length;
				case "playerVR":
					return average(a.players.map(p => parseInt(p.ev))) - average(b.players.map(p => parseInt(p.ev)));
				case "playerBR":
					return average(a.players.map(p => parseInt(p.eb))) - average(b.players.map(p => parseInt(p.eb)));
				default:
					return 0;
			}
		});

		return form.getValues().reverseSortDirection ? results.reverse() : results;
	}, [rooms, form]);
};

export default useRoomsFilter;
