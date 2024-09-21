import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Active Players · Retro Rewind · Players & Rooms",
};

const PlayersLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <>{children}</>;
};

export default PlayersLayout;
