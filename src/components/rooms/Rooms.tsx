"use client";

import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
import Masonry, { ResponsiveMasonry, ResponsiveMasonryProps } from "react-responsive-masonry";

import Alert from "../common/alert";
import Loading from "../common/loading";
import { RoomItem } from ".";
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
		return (
			<Alert
				color="red"
				icon={IconAlertCircle}
				title="It appears Retro Rewind is currently unreachable."
				subtitle="It may be undergoing maintenance."
			/>
		);
	}

	if (rooms.length === 0) {
		return (
			<Alert
				color="gray"
				icon={IconAlertTriangle}
				title="It appears there are currently no active rooms."
				subtitle="Please check back again soon."
			/>
		);
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
