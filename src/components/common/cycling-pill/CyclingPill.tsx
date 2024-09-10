import { Box, BoxProps, Pill, Transition } from "@mantine/core";
import { useInterval, useToggle } from "@mantine/hooks";

import React from "react";

interface Props extends Omit<BoxProps, "children"> {
	values: string[];
	duration?: number;
}

const CyclingPill = ({ values, duration = 5000, ...props }: Props) => {
	const [active, toggleActive] = useToggle(values.map((_, i) => i));

	// TODO: Handle when VR is updated. Currently breaks cycling
	useInterval(toggleActive, duration, { autoInvoke: true });

	return (
		<Box
			pos="relative"
			miw={80}
			{...props}
		>
			{values.map((value, index) => (
				<Transition
					key={value}
					mounted={active === index}
					transition="fade"
					duration={800}
					timingFunction="ease"
				>
					{styles => (
						<Pill
							pos="absolute"
							top={0}
							bottom={0}
							right={0}
							my="auto"
							style={styles}
						>
							{value}
						</Pill>
					)}
				</Transition>
			))}
		</Box>
	);
};

export default CyclingPill;
