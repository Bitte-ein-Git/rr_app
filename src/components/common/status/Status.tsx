import { Badge, Group, GroupProps } from "@mantine/core";

import { Room } from "@/lib/types";

interface Props extends GroupProps {
	rooms?: Room[];
}

const Status = ({ rooms, ...props }: Props) => {
	return (
		<Group
			gap="xs"
			justify="flex-end"
			align="center"
			{...props}
		>
			<Badge
				variant="light"
				radius="sm"
				color="gray"
			>
				{rooms?.length ?? 0} rooms
			</Badge>
			<Badge
				variant="light"
				radius="sm"
				color="gray"
			>
				{rooms?.reduce((total, { players }) => total + players.length, 0) ?? 0} players
			</Badge>
		</Group>
	);
};

export default Status;
