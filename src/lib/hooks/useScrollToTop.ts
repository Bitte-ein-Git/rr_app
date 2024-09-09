"use client";

import { useTimeout, useWindowScroll } from "@mantine/hooks";

import { useState } from "react";

const useScrollToTop = (): { scroll: { x: number; y: number }; scrolling: boolean; scrollToTop: () => void } => {
	const [scroll, scrollTo] = useWindowScroll();
	const [scrolling, setScrolling] = useState<boolean>(false);
	const { start } = useTimeout(() => setScrolling(false), 1000);

	const scrollToTop = () => {
		setScrolling(true);
		scrollTo({ y: 0 });
		start();
	};

	return { scroll, scrolling, scrollToTop };
};

export default useScrollToTop;
