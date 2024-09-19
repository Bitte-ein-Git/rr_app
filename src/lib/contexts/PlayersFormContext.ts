import { createFormContext } from "@mantine/form";

interface PlayersFormValues {
	query: string;
	sortBy: string;
	reverseSortDirection: boolean;
}

export const [PlayersFormProvider, usePlayersFormContext, usePlayersForm] = createFormContext<PlayersFormValues>();
