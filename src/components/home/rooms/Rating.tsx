import { Box, BoxProps, Pill, Transition } from "@mantine/core";
import { useInterval, useToggle } from "@mantine/hooks";

import React from "react";

interface Props extends Omit<BoxProps, "children"> {
	values: string[];
}

const Rating = ({ values, ...props }: Props) => {
	const [active, toggleActive] = useToggle(values);

	useInterval(toggleActive, 5000, { autoInvoke: true });

	return (
		<Box
			pos="relative"
			miw={76}
			{...props}
		>
			{values.map(value => (
				<Transition
					key={value}
					mounted={active === value}
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

export default Rating;
