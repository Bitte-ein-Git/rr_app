import { Player } from ".";

interface Room {
	id: string;
	game: string;
	created: Date;
	type: string;
	suspend: boolean;
	host: string;
	rk: string;
	players: Player[];
}

export default Room;
