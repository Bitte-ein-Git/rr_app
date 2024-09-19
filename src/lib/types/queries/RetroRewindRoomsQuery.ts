import { Player } from "..";

interface RetroRewindRoomsQuery {
	id: string;
	game: string;
	created: Date;
	type: string;
	suspend: boolean;
	host: string;
	rk: string;
	players: { [key: string]: Player };
}

export default RetroRewindRoomsQuery;
