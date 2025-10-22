"use client";

import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
// Removed Masonry and ResponsiveMasonry imports
import { Stack } from "@mantine/core"; // Import Stack

import Alert from "../common/alert";
import Loading from "../common/loading";
import React from "react";
import { RoomItem } from ".";
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

    // Removed ResponsiveMasonryComponent and MasonryComponent casts

	// render the stack layout for rooms
	return (
        <Stack align="center" gap="1.5rem"> {/* Use Stack instead of Masonry */}
            {/* map through rooms and render RoomItem for each */}
            {rooms.map(room => (
                <RoomItem
                    key={room.id}
                    room={room}
                    // Apply max width similar to player list items if needed
                    // You might need to adjust the width based on your design
                    // Example: style={{ maxWidth: '400px', width: '100%' }}
                    style={{ width: '100%', maxWidth: '500px'}} // Set width for RoomItem
                />
            ))}
        </Stack>
	);
};

export default Rooms;