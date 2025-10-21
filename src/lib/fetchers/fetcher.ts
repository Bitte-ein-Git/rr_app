import { Player, Room } from "@/lib/types";

// define the shape of the raw fetched data (players as object)
interface FetchedRoomRaw {
	id: string;
	game: string;
	created: Date;
	type: string;
	suspend: boolean;
	host: string;
	rk: string;
	// players object where each player has a mii array
	players: { [key: string]: Omit<Player, 'mii'> & { mii: { name: string; data: string }[] } };
}

// generic fetcher function
const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		const errorText = await response.text(); // Get more error details
		throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
	}
	// Handle potential empty or non-JSON responses gracefully
	const text = await response.text();
	if (!text) {
		// Return null or empty array if appropriate for the endpoint
		return url.includes('/rwfc') ? [] : null;
	}
	const data = JSON.parse(text);


	// specific transformation for the rooms endpoint
	if (url.includes('/rwfc')) { // Check if it's the rooms URL
		const rawData = data as FetchedRoomRaw[]; // Type assertion for initial fetch

		// perform the transformation
		const transformedData = rawData.map(room => {
			const playersArray = Object.values(room.players || {}).map(player => ({
				...player,
				// Safely get the mii data string from the first element of the mii array
				mii: player.mii?.[0]?.data || "", // This results in a string
			}));
			// Construct the room object with the transformed players array
			return {
				...room,
				players: playersArray, // players is now Player[] implicitly due to the map above
			};
		});
		// Explicitly cast the final result to Room[]
		return transformedData as Room[];
	}

    // return data as-is for other endpoints (like version checks)
	return data;
};

export default fetcher;