"use client";

import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
// Import Masonry and ResponsiveMasonry
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Alert from "../common/alert";
import Loading from "../common/loading";
import React from "react";
import { RoomItem } from ".";
// removed unused imports
import useRooms from "@/lib/hooks/swr/useRooms";
import useRoomsFilter from "@/lib/hooks/filters/useRoomsFilter";

// Removed Props interface

const Rooms = () => { // removed props parameter
	// fetch room data and filter/sort it
	const { data, isLoading, error } = useRooms();
	const rooms = useRoomsFilter(data);

	// display loading state
	if (isLoading) {
		return <Loading>Fetching rooms..</Loading>;
	}

	// display error state if fetch fails
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

	// display message if no rooms are active
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

    // cast ResponsiveMasonry to any to bypass type checking issue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ResponsiveMasonryComponent = ResponsiveMasonry as any;
    // cast Masonry to any to bypass type checking issue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MasonryComponent = Masonry as any;

	// render the masonry layout for rooms
	return (
        <ResponsiveMasonryComponent
			// define breakpoints for column count
			columnsCountBreakPoints={{ 0: 1, 768: 2, 1200: 3 }}
		>
			<MasonryComponent gutter="1.5rem"> {/* Use the casted component */}
				{/* map through rooms and render RoomItem for each */}
				{rooms.map(room => (
					<RoomItem
						key={room.id}
						room={room}
					/>
				))}
			</MasonryComponent>
		</ResponsiveMasonryComponent>
	);
};

export default Rooms;