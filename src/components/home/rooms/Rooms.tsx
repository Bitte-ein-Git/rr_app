import Masonry, { ResponsiveMasonry, ResponsiveMasonryProps } from "react-responsive-masonry";

import { NoPlayersAlert } from "../alerts";
import { Room } from "@/lib/types";
import RoomsItem from "./RoomsItem";
import useRoomsFilter from "@/lib/hooks/useRoomsFilter";

interface Props extends Omit<ResponsiveMasonryProps, "children"> {
	rooms: Room[];
}

const Rooms = ({ rooms, ...props }: Props) => {
	const data = useRoomsFilter(rooms);

	if (!data || data.length === 0) {
		return <NoPlayersAlert />;
	}

	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{ 0: 1, 768: 2, 1200: 3 }}
			{...props}
		>
			<Masonry gutter="1.5rem">
				{data
					.sort((a, b) => Object.keys(b.players).length - Object.keys(a.players).length)
					.map(room => (
						<RoomsItem
							key={room.id}
							room={room}
						/>
					))}
			</Masonry>
		</ResponsiveMasonry>
	);
};

export default Rooms;
