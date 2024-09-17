"use client";

import { Group, Stack } from "@mantine/core";
import { RoomsFormProvider, useRoomsForm } from "@/lib/form-contexts/RoomsFormContext";

import Loading from "@/components/common/loading";
import { NoPlayersAlert } from "@/components/common/alerts";
import React from "react";
import Rooms from "@/components/rooms/Rooms";
import RoomsForm from "@/components/forms/rooms-form";
import Status from "@/components/common/status";
import useRetroRewindRooms from "@/lib/hooks/queries/useRetroRewindRooms";

const RootPage = () => {
	const form = useRoomsForm({
		initialValues: {
			filters: [],
			sortBy: "playerCount",
			reverseSortDirection: true,
		},
		mode: "uncontrolled",
	});

	const { rooms, status } = useRetroRewindRooms();

	if (status === "pending") {
		return <Loading>Fetching rooms..</Loading>;
	}

	return (
		<RoomsFormProvider form={form}>
			<Stack gap="sm">
				<Group justify="space-between">
					<Status rooms={rooms} />
					<RoomsForm />
				</Group>
				{!rooms ? <NoPlayersAlert /> : <Rooms rooms={rooms} />}
			</Stack>
		</RoomsFormProvider>
	);
};

export default RootPage;
