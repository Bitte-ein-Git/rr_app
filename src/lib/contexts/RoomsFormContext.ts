import { createFormContext } from "@mantine/form";

interface RoomsFormValues {
	filters: { key: string; value: string }[];
	sortBy: string;
	reverseSortDirection: boolean;
}

export const [RoomsFormProvider, useRoomsFormContext, useRoomsForm] = createFormContext<RoomsFormValues>();
