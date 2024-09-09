import { Divider, Paper, PaperProps, Stack } from "@mantine/core";

import { Room } from "@/lib/types";
import RoomDetails from "./room-details";
import { RoomPlayersItem } from ".";

interface Props extends PaperProps {
	room: Room;
}

const RoomsItem = ({ room, ...props }: Props) => {
	return (
		<Paper
			style={{ overflow: "hidden" }}
			radius="md"
			withBorder
			{...props}
		>
			<RoomDetails room={room} />
			<Divider />
			<Stack gap={4}>
				{Object.values(room.players)
					.sort(({ ev: ev1 }, { ev: ev2 }) => parseInt(ev2) - parseInt(ev1))
					.map((player, index) => (
						<RoomPlayersItem
							key={player.pid}
							player={player}
							filled={index % 2 === 1}
						/>
					))}
			</Stack>
		</Paper>
	);
};

export default RoomsItem;
