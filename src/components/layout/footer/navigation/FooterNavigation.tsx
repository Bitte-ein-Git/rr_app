"use client";

import { Group, GroupProps } from "@mantine/core";
import { IconUser, IconUsersGroup } from "@tabler/icons-react";

import { FooterNavigationItem } from ".";
import React from "react";

interface Props extends Omit<GroupProps, "children"> {}

const FooterNavigation = ({ ...props }: Props) => {
	return (
		<Group
			h={64}
			justify="center"
			align="stretch"
			py={4}
			grow
			{...props}
		>
			<FooterNavigationItem
				icon={IconUsersGroup}
				href="/rooms"
			>
				Rooms
			</FooterNavigationItem>
			<FooterNavigationItem
				icon={IconUser}
				href="/players"
			>
				Active Players
			</FooterNavigationItem>
		</Group>
	);
};

export default FooterNavigation;
