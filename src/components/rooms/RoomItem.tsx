import { Divider, Paper, PaperProps, Stack } from "@mantine/core";

import { Room } from "@/lib/types";
import RoomItemDetails from "./room-details";
import RoomPlayer from "./room-player";

interface Props extends Omit<PaperProps, "children"> {
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
			<RoomItemDetails room={room} />
			<Divider />
			<Stack gap={0}>
				{[...room.players]
					.sort(({ ev: ev1 }, { ev: ev2 }) => parseInt(ev2) - parseInt(ev1))
					.map((player, index) => (
						<RoomPlayer
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
