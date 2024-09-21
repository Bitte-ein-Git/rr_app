"use client";

import { RoomsFormProvider as Provider, useRoomsForm } from "../contexts/RoomsFormContext";

import React from "react";

const RoomsFormProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const form = useRoomsForm({
		initialValues: {
			filters: [],
			sortBy: "players",
			reverseSortDirection: true,
		},
	});

	return <Provider form={form}>{children}</Provider>;
};

export default RoomsFormProvider;
