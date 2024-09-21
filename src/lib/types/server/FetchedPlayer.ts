interface FetchedPlayer {
	count: string;
	pid: string;
	name: string;
	conn_map: string;
	conn_fail: string;
	suspend: string;
	fc: string;
	ev: string;
	eb: string;
	mii: { [key: string]: { name: string; data: string } };
}

export default FetchedPlayer;
