"use client";

import Masonry, { ResponsiveMasonry, ResponsiveMasonryProps } from "react-responsive-masonry";

import Loading from "../common/loading";
import { RoomItem } from ".";
import { Text } from "@mantine/core";
import useRooms from "@/lib/hooks/swr/useRooms";
import useRoomsFilter from "@/lib/hooks/filters/useRoomsFilter";

interface Props extends Omit<ResponsiveMasonryProps, "children"> {}

const Rooms = ({ ...props }: Props) => {
	const { data, isLoading, error } = useRooms();

	const rooms = useRoomsFilter(data);

	if (isLoading) {
		return <Loading>Fetching rooms..</Loading>;
	}

	if (error) {
		return <Text>There was an issue fetching rooms.</Text>;
	}

	if (rooms.length === 0) {
		return <Text>No players online.</Text>;
	}

	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{ 0: 1, 768: 2, 1200: 3 }}
			{...props}
		>
			<Masonry gutter="1.5rem">
				{rooms.map(room => (
					<RoomItem
						key={room.id}
						room={room}
					/>
				))}
			</Masonry>
		</ResponsiveMasonry>
	);
};

export default Rooms;
