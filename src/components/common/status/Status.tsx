"use client";

import { Badge, Group, GroupProps } from "@mantine/core";

import useRooms from "@/lib/hooks/swr/useRooms";

interface Props extends GroupProps {}

const Status = ({ ...props }: Props) => {
	const { data, isLoading } = useRooms();

	const rooms = data?.length ?? 0;
	const players = data?.reduce((total, { players }) => total + players.length, 0) ?? 0;

	return (
		<Group
			h={30}
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
				{isLoading ? "Loading.." : `${rooms} rooms`}
			</Badge>
			<Badge
				variant="light"
				radius="sm"
				color="gray"
			>
				{isLoading ? "Loading.." : `${players} players`}
			</Badge>
		</Group>
	);
};

export default Status;
