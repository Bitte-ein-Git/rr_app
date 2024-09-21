"use client";

import { Paper, PaperProps, Stack, Text } from "@mantine/core";

import Loading from "../common/loading";
import { PlayerItem } from ".";
import React from "react";
import usePlayersFilter from "@/lib/hooks/filters/usePlayersFilter";
import useRooms from "@/lib/hooks/swr/useRooms";

interface Props extends Omit<PaperProps, "children"> {}

const Players = ({ ...props }: Props) => {
	const { data, isLoading, error } = useRooms();

	const players = usePlayersFilter(data);

	if (isLoading) {
		return <Loading>Fetching players..</Loading>;
	}

	if (error) {
		return <Text>{JSON.stringify(error)}</Text>;
	}

	if (players.length === 0) {
		return <Text>No players online.</Text>;
	}

	return (
		<Paper
			style={{ overflow: "hidden" }}
			radius="md"
			withBorder
			{...props}
		>
			<Stack gap={0}>
				{players.map((player, index) => (
					<PlayerItem
						key={player.fc}
						player={player}
						filled={index % 2 === 1}
					/>
				))}
			</Stack>
		</Paper>
	);
};

export default Players;
