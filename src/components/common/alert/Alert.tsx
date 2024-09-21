import { DefaultMantineColor, Group, Paper, PaperProps, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import React from "react";

interface Props extends Omit<PaperProps, "children"> {
	color?: DefaultMantineColor;
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
	title: string;
	subtitle?: string;
}

const Alert = ({ color, icon: AlertIcon, title, subtitle, ...props }: Props) => {
	const theme = useMantineTheme();

	return (
		<Paper
			style={{ backgroundColor: !color ? undefined : theme.colors[color][0] }}
			component={Group}
			radius="md"
			px="md"
			py="sm"
			gap="md"
			{...props}
		>
			<ThemeIcon
				variant="transparent"
				size="xl"
				color={color}
			>
				<AlertIcon size={36} />
			</ThemeIcon>
			<Stack
				style={{ flexBasis: 1, flexGrow: 1 }}
				gap={6}
			>
				<Text fw={600}>{title}</Text>
				{subtitle && <Text size="sm">{subtitle}</Text>}
			</Stack>
		</Paper>
	);
};

export default Alert;
