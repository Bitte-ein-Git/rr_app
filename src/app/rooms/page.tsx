import { Group, Stack, Title } from "@mantine/core";

import React from "react";
import Rooms from "@/components/rooms";
import RoomsFormProvider from "@/lib/providers/RoomsFormProvider";
import { SortRoomsForm } from "@/components/rooms/forms";
import Status from "@/components/common/status";

const RoomsPage = () => {
	return (
		<RoomsFormProvider>
			<Stack gap="sm">
				<Title size={32}>Rooms</Title>
				<Group justify="space-between">
					<Status />
					<SortRoomsForm />
				</Group>
				<Rooms />
			</Stack>
		</RoomsFormProvider>
	);
};

export default RoomsPage;
