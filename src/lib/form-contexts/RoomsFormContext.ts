import { createFormContext } from "@mantine/form";

interface RoomsFormValues {
	query: string;
	sortProperty: string;
	sortDescending: boolean;
}

export const [RoomsFormProvider, useRoomsFormContext, useRoomsForm] = createFormContext<RoomsFormValues>();
