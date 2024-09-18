import { ActionIcon, Group, GroupProps, Select, Stack, Tooltip } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";

import sortByData from "./sortByData";
import { usePlayersFormContext } from "@/lib/contexts/PlayersFormContext";

interface Props extends Omit<GroupProps, "children"> {}

const SortForm = ({ ...props }: Props) => {
	const form = usePlayersFormContext();

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

	if (form.getValues().query.length > 0) {
		return <></>;
	}

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
					data={sortByData}
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
								onClick={() =>
									form.setFieldValue("reverseSortDirection", !form.getValues().reverseSortDirection)
								}
							>
								<SortIcon />
							</ActionIcon>
						</Tooltip>
					}
					rightSectionPointerEvents="all"
					styles={{ input: { paddingRight: 30, textAlign: "right" } }}
					comboboxProps={{ width: 78, position: "bottom-end", offset: 0 }}
					{...form.getInputProps("sortBy")}
				/>
			</Group>
		</Stack>
	);
};

export default SortForm;
