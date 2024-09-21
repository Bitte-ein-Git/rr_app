"use client";

import { NavigationProgress, nprogress } from "@mantine/nprogress";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const RouterTransition = () => {
	const pathname = usePathname();

	useEffect(() => {
		nprogress.complete();
		return () => {
			nprogress.start();
		};
	}, [pathname]);

	return <NavigationProgress />;
};
