import { FetchedPlayer } from ".";

interface FetchedRoom {
	id: string;
	game: string;
	created: Date;
	type: string;
	suspend: boolean;
	host: string;
	rk: string;
	players: { [key: string]: FetchedPlayer };
}

export default FetchedRoom;
