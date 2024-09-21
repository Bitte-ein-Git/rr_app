"use client";

import { ActionIcon, Group, GroupProps, Select, Tooltip } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import React, { useEffect, useMemo } from "react";

import { useRoomsFormContext } from "@/lib/contexts/RoomsFormContext";

interface Data {
	label: string;
	value: string;
}

const data: Data[] = [
	{
		label: "Room name",
		value: "name",
	},
	{
		label: "Lifetime",
		value: "lifetime",
	},
	{
		label: "Player count",
		value: "players",
	},
	{
		label: "Average VR",
		value: "vr",
	},
	{
		label: "Average BR",
		value: "br",
	},
];

interface Props extends Omit<GroupProps, "children"> {}

const SortRoomsForm = ({ ...props }: Props) => {
	const form = useRoomsFormContext();

	const [SortIcon, sortLabel] = useMemo(() => {
		const icon = form.getValues().reverseSortDirection ? IconSortDescending2 : IconSortAscending2;

		let label = form.getValues().reverseSortDirection ? "Sorting 9-0" : "Sorting 0-9";

		if (form.getValues().sortBy === "name") {
			label = form.getValues().reverseSortDirection ? "Sorting Z-A" : "Sorting A-Z";
		}

		return [icon, label];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues().reverseSortDirection]);

	useEffect(() => {
		form.setFieldValue("reverseSortDirection", form.getValues().sortBy !== "name");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues().sortBy]);

	return (
		<Group
			justify="flex-end"
			{...props}
		>
			<Select
				variant="unstyled"
				size="xs"
				maw={108}
				placeholder="Sort by"
				data={data}
				allowDeselect={false}
				rightSection={
					<Tooltip
						label={sortLabel}
						position="bottom-end"
					>
						<ActionIcon
							variant="subtle"
							size={20}
							color="gray"
							onClick={() => form.setFieldValue("reverseSortDirection", !form.getValues().reverseSortDirection)}
						>
							<SortIcon />
						</ActionIcon>
					</Tooltip>
				}
				rightSectionPointerEvents="all"
				styles={{ input: { paddingRight: 30, textAlign: "right" } }}
				comboboxProps={{ width: 116, position: "bottom-end", offset: 0 }}
				{...form.getInputProps("sortBy")}
			/>
		</Group>
	);
};

export default SortRoomsForm;
