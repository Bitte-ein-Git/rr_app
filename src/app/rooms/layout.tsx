import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Rooms · Retro Rewind · Players & Rooms",
};

const RoomsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <>{children}</>;
};

export default RoomsLayout;
