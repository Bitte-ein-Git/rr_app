"use client";

import { NoRoomsAlert, ServerUnreachableAlert } from "@/components/home/alerts";
import { RoomsFormProvider, useRoomsForm } from "@/lib/form-contexts/RoomsFormContext";

import Loading from "@/components/home/loading";
import React from "react";
import Rooms from "@/components/home/rooms";
import RoomsForm from "@/components/home/rooms-form";
import { Stack } from "@mantine/core";
import Sums from "@/components/home/sums";
import useMii from "@/lib/hooks/queries/useMii";
import useRetroRewindRooms from "@/lib/hooks/queries/useRetroRewindRooms";

const RootPage = () => {
	const { rooms, status } = useRetroRewindRooms();

	const roomsForm = useRoomsForm({
		initialValues: {
			query: "",
			sortProperty: "players",
			sortDescending: false,
		},
	});

	if (status === "pending") {
		return <Loading />;
	}

	return (
		<RoomsFormProvider form={roomsForm}>
			<Stack gap="lg">
				<Sums rooms={rooms} />
				<RoomsForm />

				{(status === "error" || rooms === undefined) && <ServerUnreachableAlert />}
				{rooms?.length === 0 && <NoRoomsAlert />}

				<Rooms rooms={rooms ?? []} />
			</Stack>
		</RoomsFormProvider>
	);
};

export default RootPage;
