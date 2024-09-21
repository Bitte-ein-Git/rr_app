import { Group, Stack, Title } from "@mantine/core";
import React, { Suspense } from "react";

import Loading from "@/components/common/loading";
import Rooms from "@/components/rooms";
import SortForm from "@/components/common/sort-form";
import Status from "@/components/common/status";

const RoomsPage = () => {
	return (
		<Stack gap="sm">
			<Title size={32}>Rooms</Title>
			<Group justify="space-between">
				<Status />
				<Suspense>
					<SortForm
						data={[
							{
								label: "Room name",
								value: "name",
								defaultReverseSortDirection: false,
							},
							{
								label: "Lifetime",
								value: "lifetime",
								defaultReverseSortDirection: true,
							},
							{
								label: "Player count",
								value: "players",
								defaultReverseSortDirection: true,
							},
							{
								label: "Average VR",
								value: "vr",
								defaultReverseSortDirection: true,
							},
							{
								label: "Average BR",
								value: "br",
								defaultReverseSortDirection: true,
							},
						]}
						textValues={["name"]}
						defaultValue="players"
					/>
				</Suspense>
			</Group>
			<Suspense fallback={<Loading>Fetching rooms..</Loading>}>
				<Rooms />
			</Suspense>
		</Stack>
	);
};

export default RoomsPage;
