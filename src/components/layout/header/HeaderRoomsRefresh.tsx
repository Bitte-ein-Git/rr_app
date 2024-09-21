"use client";

import { ActionIcon, Text, Tooltip } from "@mantine/core";
import React, { useEffect } from "react";

import { IconReload } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import useDuration from "@/lib/hooks/useDuration";
import useRooms from "@/lib/hooks/swr/useRooms";

dayjs.extend(relativetime);

const HeaderRoomsRefresh = () => {
	const { isValidating, mutate } = useRooms();
	const { duration, setDate } = useDuration();

	useEffect(() => {
		if (!isValidating) {
			setDate(new Date());
		}
	}, [isValidating, setDate]);

	return (
		<Tooltip
			label={
				<>
					<Text inherit>Fetch latest data</Text>
					{duration && (
						<Text
							fs="italic"
							size="xs"
						>
							Last fetched {duration}
						</Text>
					)}
				</>
			}
			position="bottom-end"
		>
			<ActionIcon
				variant="subtle"
				color="gray"
				size="lg"
				loading={isValidating}
				loaderProps={{ type: "dots" }}
				onClick={() => mutate()}
			>
				<IconReload size={24} />
			</ActionIcon>
		</Tooltip>
	);
};

export default HeaderRoomsRefresh;
