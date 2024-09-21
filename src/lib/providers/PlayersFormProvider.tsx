"use client";

import { PlayersFormProvider as Provider, usePlayersForm } from "../contexts/PlayersFormContext";

import React from "react";

const PlayersFormProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const form = usePlayersForm({
		initialValues: {
			query: "",
			filters: [],
			sortBy: "vr",
			reverseSortDirection: true,
		},
	});

	return <Provider form={form}>{children}</Provider>;
};

export default PlayersFormProvider;
