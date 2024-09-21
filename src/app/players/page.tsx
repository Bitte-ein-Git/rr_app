import { Group, Stack, Title } from "@mantine/core";
import React, { Suspense } from "react";

import Loading from "@/components/common/loading";
import Players from "@/components/players";
import SortForm from "@/components/common/sort-form";
import Status from "@/components/common/status/Status";

const PlayersPage = () => {
	return (
		<Stack gap="sm">
			<Title size={32}>Active Players</Title>
			<Group justify="space-between">
				<Status />
				<Suspense>
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
				</Suspense>
			</Group>
			{/* <SearchPlayersForm /> */}
			<Suspense fallback={<Loading>Fetching players..</Loading>}>
				<Players />
			</Suspense>
		</Stack>
	);
};

export default PlayersPage;
