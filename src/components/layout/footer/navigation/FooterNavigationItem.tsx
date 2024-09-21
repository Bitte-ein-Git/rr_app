"use client";

import { Button, ButtonProps, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Props extends ButtonProps {
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
	href: string;
}

const FooterNavigationItem = ({ icon: FooterTabIcon, href, children, ...props }: Props) => {
	const pathname = usePathname();
	const theme = useMantineTheme();

	const active = pathname.startsWith(href);

	return (
		<Button
			component={Link}
			variant="subtle"
			h="100%"
			color="gray"
			href={href}
			{...props}
		>
			<Stack
				justify="center"
				align="center"
				gap={4}
			>
				<ThemeIcon
					variant="transparent"
					color={active ? theme.primaryColor : "gray"}
				>
					<FooterTabIcon />
				</ThemeIcon>
				<Text
					size="xs"
					c={active ? theme.primaryColor : undefined}
				>
					{children}
				</Text>
			</Stack>
		</Button>
	);
};

export default FooterNavigationItem;
