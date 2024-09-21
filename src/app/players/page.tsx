import { Group, Stack, Title } from "@mantine/core";

import Players from "@/components/players";
import PlayersFormProvider from "@/lib/providers/PlayersFormProvider";
import React from "react";
import { SearchPlayersForm } from "@/components/players/forms";
import SortPlayersForm from "@/components/players/forms/SortPlayersForm";
import Status from "@/components/common/status/Status";

const PlayersPage = () => {
	return (
		<PlayersFormProvider>
			<Stack gap="md">
				<Title size={32}>Players Online</Title>
				<Group justify="space-between">
					<Status />
					<SortPlayersForm />
				</Group>
				<SearchPlayersForm />
				<Players />
			</Stack>
		</PlayersFormProvider>
	);
};

export default PlayersPage;
