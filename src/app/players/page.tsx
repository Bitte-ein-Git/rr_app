import { Group, Stack, Title } from "@mantine/core";

import Players from "@/components/players";
import React from "react";
import SortForm from "@/components/common/sort-form";
import Status from "@/components/common/status/Status";

const PlayersPage = () => {
	return (
		<Stack gap="sm">
			<Title size={32}>Active Players</Title>
			<Group justify="space-between">
				<Status />
				<SortForm
					data={[
						{
							label: "Name",
							value: "name",
							defaultReverseSortDirection: false,
						},
						{
							label: "VR",
							value: "vr",
							defaultReverseSortDirection: true,
						},
						{
							label: "BR",
							value: "br",
							defaultReverseSortDirection: true,
						},
					]}
					textValues={["name"]}
					defaultValue="vr"
				/>
			</Group>
			{/* <SearchPlayersForm /> */}
			<Players />
		</Stack>
	);
};

export default PlayersPage;
