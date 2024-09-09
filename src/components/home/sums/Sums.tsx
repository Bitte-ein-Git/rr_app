import { Badge, Group, GroupProps } from "@mantine/core";

import { Room } from "@/lib/types";

interface Props extends GroupProps {
	rooms?: Room[];
}

const Sums = ({ rooms, ...props }: Props) => {
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
				{rooms?.reduce((total, { players }) => total + Object.values(players).length, 0) ?? 0} players
			</Badge>
		</Group>
	);
};

export default Sums;
