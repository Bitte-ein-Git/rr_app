import { ActionIcon, Group, GroupProps, Select, Stack, Tooltip } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";

import sortPropertyData from "./sortPropertyData";
import { useRoomsFormContext } from "@/lib/form-contexts/RoomsFormContext";

interface Props extends Omit<GroupProps, "children"> {}

const RoomsForm = ({ ...props }: Props) => {
	const form = useRoomsFormContext();

	const [SortIcon, sortLabel] = useMemo(() => {
		const icon = form.getValues().reverseSortDirection ? IconSortDescending2 : IconSortAscending2;

		let label = form.getValues().reverseSortDirection ? "Sorted 9-0" : "Sorted 0-9";

		if (form.getValues().sortBy === "roomName") {
			label = form.getValues().reverseSortDirection ? "Sorted Z-A" : "Sorted A-Z";
		}

		return [icon, label];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues().reverseSortDirection]);

	useEffect(() => {
		form.setFieldValue("reverseSortDirection", form.getValues().sortBy !== "roomName");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues().sortBy]);

	return (
		<Stack>
			<Group
				justify="flex-end"
				{...props}
			>
				<Select
					variant="unstyled"
					size="xs"
					maw={112}
					placeholder="Sort by"
					data={sortPropertyData}
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
								onClick={() => form.setFieldValue("reverseSortDirection", !form.values.reverseSortDirection)}
							>
								<SortIcon />
							</ActionIcon>
						</Tooltip>
					}
					rightSectionPointerEvents="all"
					styles={{ input: { paddingRight: 30, textAlign: "right" } }}
					comboboxProps={{ width: 122, position: "bottom-end", offset: 0 }}
					{...form.getInputProps("sortBy")}
				/>
			</Group>
		</Stack>
	);
};

export default RoomsForm;
