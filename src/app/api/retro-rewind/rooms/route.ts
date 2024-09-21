import { FetchedRoom } from "@/lib/types/server";
import { NextResponse } from "next/server";
import { URL_EXTERNAL_RETROREWIND_ROOMS } from "@/lib/constants";
import { Room } from "@/lib/types";

export const GET = async (): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_ROOMS, { next: { revalidate: 15 } });
		const body: FetchedRoom[] = await response.json();

		if (!body) {
			return NextResponse.error();
		}

		const rooms = body.map<Room>(room => ({
			...room,
			players: Object.values(room.players).map(player => ({ ...player, mii: player.mii[0].data })),
		}));

		return NextResponse.json(rooms);
	} catch (error) {
		return NextResponse.error();
	}
};
