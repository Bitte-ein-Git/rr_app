import { ActionIcon, ComboboxItem, Grid, GridProps, Select } from "@mantine/core";
import { useEffect, useMemo } from "react";

import Search from "@/components/common/search";
import sortPropertyData from "./sortPropertyData";
import { useRoomsFormContext } from "@/lib/form-contexts/RoomsFormContext";
import useSortIcon from "@/lib/hooks/useSortIcon";

interface Props extends Omit<GridProps, "children"> {}

const RoomsForm = ({ ...props }: Props) => {
	const form = useRoomsFormContext();

	const searching = useMemo(() => form.getValues().query.length > 0, [form]);

	const SortIcon = useSortIcon(form.getValues().sortProperty, form.getValues().sortDescending, ["id", "game", "type"]);

	useEffect(() => {
		form.setFieldValue("sortProperty", searching ? "relevance" : "players");
	}, [searching]);

	return (
		<Grid
			gutter="xs"
			{...props}
		>
			<Grid.Col span={{ base: 7, md: 6 }}>
				<Search
					style={{ flexGrow: 1 }}
					placeholder="Search for a player.."
					query={form.getValues().query}
					setQuery={value => form.setFieldValue("query", value)}
					{...form.getInputProps("query")}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 5, md: 6 }}>
				<Select
					style={{ flexGrow: 1 }}
					placeholder="Sort by"
					data={sortPropertyData}
					allowDeselect={false}
					rightSection={
						form.getValues().sortProperty === "relevance" ? (
							<></>
						) : (
							<ActionIcon
								variant="transparent"
								size="lg"
								color="gray"
								onClick={() => form.setFieldValue("sortDescending", !form.values.sortDescending)}
							>
								<SortIcon />
							</ActionIcon>
						)
					}
					rightSectionPointerEvents="all"
					disabled={searching}
					filter={({ options }) =>
						searching ? options : (options as ComboboxItem[]).filter(o => o.value !== "relevance")
					}
					{...form.getInputProps("sortProperty")}
				/>
			</Grid.Col>
		</Grid>
	);
};

export default RoomsForm;
