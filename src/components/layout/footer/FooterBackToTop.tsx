"use client";

import FooterIcon from "./FooterIcon";
import { IconArrowUp } from "@tabler/icons-react";
import React from "react";
import { Transition } from "@mantine/core";
import useScrollToTop from "@/lib/hooks/useScrollToTop";

const FooterBackToTop = () => {
	const { scroll, scrolling, scrollToTop } = useScrollToTop();

	return (
		<Transition
			transition="slide-up"
			exitDuration={100}
			mounted={!scrolling && scroll.y > 0}
		>
			{transitionStyles => (
				<FooterIcon
					transitionStyles={transitionStyles}
					label="Back to top"
					icon={IconArrowUp}
					onClick={scrollToTop}
				/>
			)}
		</Transition>
	);
};

export default FooterBackToTop;
