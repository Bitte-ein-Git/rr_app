import { Box, BoxProps, Group, Text, ThemeIcon, useComputedColorScheme, useMantineTheme } from "@mantine/core";

import { IconUsers } from "@tabler/icons-react";
import { Room } from "@/lib/types";
import RoomModeBadge from "./RoomModeBadge";
import RoomTypeBadge from "./RoomTypeBadge";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

dayjs.extend(advancedFormat);
dayjs.extend(relativetime);

interface Props extends BoxProps {
	room: Room;
}

const RoomDetails = ({ room, ...props }: Props) => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	return (
		<Box
			px="md"
			py="sm"
			bg={computedColorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]}
			{...props}
		>
			<Group
				justify="space-between"
				align="center"
			>
				<Text
					fw={700}
					size="xl"
				>
					#{room.id}
				</Text>
				<Group
					align="center"
					gap="xs"
				>
					{room.rk && <RoomModeBadge mode={room.rk.includes("vs") ? "VS" : "TT"} />}
					<RoomTypeBadge locked={room.type === "private"} />
				</Group>
			</Group>
			<Group
				justify="space-between"
				align="flex-end"
			>
				<Group
					gap={4}
					align="center"
				>
					<ThemeIcon
						variant="subtle"
						size="xs"
						color="gray"
					>
						<IconUsers size={14} />
					</ThemeIcon>
					<Text
						lh={1.32}
						size="sm"
						c="dimmed"
					>
						{Object.values(room.players).length} / 12
					</Text>
				</Group>
				<Text
					size="xs"
					c="dimmed"
				>
					Active for {dayjs(room.created).fromNow(true)}
				</Text>
			</Group>
		</Box>
	);
};

export default RoomDetails;
