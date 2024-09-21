"use client";

import { FilterFormValues, SearchFormValues, SortFormValues } from "../types/forms";

import { createFormContext } from "@mantine/form";

interface PlayersFormValues extends SortFormValues, FilterFormValues, SearchFormValues {}

export const [PlayersFormProvider, usePlayersFormContext, usePlayersForm] = createFormContext<PlayersFormValues>();
