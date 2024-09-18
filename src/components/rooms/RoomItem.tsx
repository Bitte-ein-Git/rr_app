import { Divider, Paper, PaperProps, Stack } from "@mantine/core";

import PlayerItem from "../common/player-item/PlayerItem";
import { Room } from "@/lib/types";
import RoomDetails from "./RoomDetails";

interface Props extends PaperProps {
	room: Room;
}

const RoomItem = ({ room, ...props }: Props) => {
	return (
		<Paper
			style={{ overflow: "hidden" }}
			radius="md"
			withBorder
			{...props}
		>
			<RoomDetails room={room} />
			<Divider />
			<Stack gap={0}>
				{[...room.players]
					.sort(({ ev: ev1 }, { ev: ev2 }) => parseInt(ev2) - parseInt(ev1))
					.map((player, index) => (
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

export default RoomItem;
