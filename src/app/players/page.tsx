"use client";

import { Group, Stack } from "@mantine/core";
import { PlayersFormProvider, usePlayersForm } from "@/lib/contexts/PlayersFormContext";
import { SearchForm, SortForm } from "@/components/players/form";

import Loading from "@/components/common/loading";
import { NoPlayersAlert } from "@/components/common/alerts";
import Players from "@/components/players/Players";
import React from "react";
import Status from "@/components/common/status";
import useRetroRewindRooms from "@/lib/hooks/queries/useRetroRewindRooms";

const PlayersPage = () => {
	const form = usePlayersForm({
		initialValues: {
			query: "",
			sortBy: "name",
			reverseSortDirection: false,
		},
	});

	const { rooms, status } = useRetroRewindRooms();

	if (status === "pending") {
		return <Loading>Fetching rooms..</Loading>;
	}

	return (
		<PlayersFormProvider form={form}>
			<Stack gap="sm">
				<Group justify="space-between">
					<Status rooms={rooms} />
					<SortForm />
				</Group>
				<SearchForm />
				{!rooms ? <NoPlayersAlert /> : <Players rooms={rooms} />}
			</Stack>
		</PlayersFormProvider>
	);
};

export default PlayersPage;
