import { Box, Group, GroupProps, Text, ThemeIcon } from "@mantine/core";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Icon, IconProps } from "@tabler/icons-react";

interface Props extends GroupProps {
	icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	label: string;
	value: string | undefined;
}

const AboutItem = ({ icon: AboutItemIcon, label, value, ...props }: Props) => {
	return (
		<Group
			align="start"
			gap="sm"
			{...props}
		>
			<ThemeIcon
				variant="transparent"
				color="gray"
				mt={1.6}
			>
				<AboutItemIcon />
			</ThemeIcon>
			<Box>
				<Text
					fw={600}
					size="sm"
				>
					{label}
				</Text>
				<Text c="dimmed">{!value ? "Not found" : value}</Text>
			</Box>
		</Group>
	);
};

export default AboutItem;
