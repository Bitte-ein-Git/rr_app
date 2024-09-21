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
				Active Rooms
			</FooterNavigationItem>
			<FooterNavigationItem
				icon={IconUser}
				href="/players"
			>
				Players Online
			</FooterNavigationItem>
		</Group>
	);
};

export default FooterNavigation;
