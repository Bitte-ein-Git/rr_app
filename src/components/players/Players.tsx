import { Paper, PaperProps, Stack } from "@mantine/core";

import PlayerItem from "../common/player-item/PlayerItem";
import React from "react";
import { Room } from "@/lib/types";
import usePlayersFilter from "@/lib/hooks/filters/usePlayersFilter";

interface Props extends PaperProps {
	rooms: Room[];
}

const Players = ({ rooms, ...props }: Props) => {
	const data = usePlayersFilter(rooms);

	return (
		<Paper
			style={{ overflow: "hidden" }}
			radius="md"
			withBorder
			{...props}
		>
			<Stack gap={0}>
				{data.map((player, index) => (
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
