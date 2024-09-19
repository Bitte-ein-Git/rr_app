"use client";

import { Group, Stack, Title } from "@mantine/core";
import { RoomsFormProvider, useRoomsForm } from "@/lib/contexts/RoomsFormContext";

import Loading from "@/components/common/loading";
import { NoPlayersAlert } from "@/components/common/alerts";
import React from "react";
import Rooms from "@/components/rooms/Rooms";
import SortForm from "@/components/rooms/form";
import Status from "@/components/common/status";
import useRetroRewindRooms from "@/lib/hooks/queries/useRetroRewindRooms";

const RoomsPage = () => {
	const form = useRoomsForm({
		initialValues: {
			filters: [],
			sortBy: "players",
			reverseSortDirection: true,
		},
	});

	const { rooms, status } = useRetroRewindRooms();

	if (status === "pending") {
		return <Loading>Fetching rooms..</Loading>;
	}

	return (
		<RoomsFormProvider form={form}>
			<Stack gap="sm">
				<Title size={32}>Rooms</Title>
				<Group justify="space-between">
					<Status rooms={rooms} />
					<SortForm />
				</Group>
				{!rooms ? <NoPlayersAlert /> : <Rooms rooms={rooms} />}
			</Stack>
		</RoomsFormProvider>
	);
};

export default RoomsPage;
