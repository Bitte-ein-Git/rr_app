"use client";

import { FilterFormValues, SortFormValues } from "../types/forms";

import { createFormContext } from "@mantine/form";

interface RoomsFormValues extends SortFormValues, FilterFormValues {}

export const [RoomsFormProvider, useRoomsFormContext, useRoomsForm] = createFormContext<RoomsFormValues>();
