"use client";

import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
import { Paper, PaperProps, Stack } from "@mantine/core";

import Alert from "../common/alert";
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
		return (
			<Alert
				color="red"
				icon={IconAlertCircle}
				title="It appears Retro Rewind is currently unreachable."
				subtitle="It may be undergoing maintenance."
			/>
		);
	}

	if (players.length === 0) {
		return (
			<Alert
				color="gray"
				icon={IconAlertTriangle}
				title="It appears there are currently no players online."
				subtitle="Please check back again soon."
			/>
		);
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
