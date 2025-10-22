import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Rooms",
};

const RoomsLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <>{children}</>;
};

export default RoomsLayout;
