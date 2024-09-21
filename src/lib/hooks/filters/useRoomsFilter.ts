"use client";

import { Room } from "../../types";
import { average } from "../../util";
import { useMemo } from "react";
import { useRoomsFormContext } from "@/lib/contexts/RoomsFormContext";

const useRoomsFilter = (data: Room[] | undefined): Room[] => {
	const form = useRoomsFormContext();

	return useMemo(() => {
		if (!data) return [];

		let rooms: Room[] = data;

		// Filter
		// TODO: filter rooms here

		// Sort
		rooms = [...rooms].sort((a, b) => {
			switch (form.getValues().sortBy) {
				case "name":
					return a.id.localeCompare(b.id);
				case "lifetime":
					return new Date(b.created).getTime() - new Date(a.created).getTime();
				case "players":
					return Object.keys(a.players).length - Object.keys(b.players).length;
				case "vr":
					return (
						average(a.players.map(p => (!p.ev ? Number.NEGATIVE_INFINITY : Number(p.ev)))) -
						average(b.players.map(p => (!p.ev ? Number.NEGATIVE_INFINITY : Number(p.ev))))
					);
				case "br":
					return (
						average(a.players.map(p => (!p.eb ? Number.NEGATIVE_INFINITY : Number(p.eb)))) -
						average(b.players.map(p => (!p.eb ? Number.NEGATIVE_INFINITY : Number(p.eb))))
					);
				default:
					return 0;
			}
		});

		return form.getValues().reverseSortDirection ? rooms.reverse() : rooms;
	}, [data, form]);
};

export default useRoomsFilter;
