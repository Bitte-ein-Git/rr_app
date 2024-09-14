import { PolymorphicComponentProps, Text, TextProps } from "@mantine/core";

import React from "react";
import useGradient from "@/lib/hooks/useGradient";

interface Props extends PolymorphicComponentProps<"div", TextProps> {}

const AboutSectionTitle = ({ children, ...props }: Props) => {
	const gradient = useGradient();

	return (
		<Text
			variant="gradient"
			fw={600}
			size="sm"
			tt="uppercase"
			gradient={gradient}
			{...props}
		>
			{children}
		</Text>
	);
};

export default AboutSectionTitle;
