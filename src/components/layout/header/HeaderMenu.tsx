"use client";

import { ActionIcon, Menu, MenuDropdown, MenuProps, MenuTarget, ModalTitle } from "@mantine/core";
import { IconDotsVertical, IconInfoCircle, IconSettings } from "@tabler/icons-react";

import AboutModal from "@/components/modals/about";
import { HeaderMenuItem } from ".";
import React from "react";
import SettingsModal from "@/components/modals/settings";
import { modals } from "@mantine/modals";

interface Props extends Omit<MenuProps, "children"> {}

const HeaderMenu = ({ ...props }: Props) => {
	const handleSettingsClick = () => {
		modals.open({
			title: <ModalTitle>Settings</ModalTitle>,
			children: <SettingsModal />,
		});
	};

	const handleAboutClick = () => {
		modals.open({
			title: <ModalTitle>About</ModalTitle>,
			children: <AboutModal />,
		});
	};

	return (
		<Menu
			position="bottom-end"
			{...props}
		>
			<MenuTarget>
				<ActionIcon
					variant="subtle"
					color="gray"
					size="lg"
				>
					<IconDotsVertical size={24} />
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<HeaderMenuItem
					title="Settings"
					description="Adjust data fetching and theming"
					icon={IconSettings}
					onClick={handleSettingsClick}
				/>
				<HeaderMenuItem
					title="About"
					description="Development and app information"
					icon={IconInfoCircle}
					onClick={handleAboutClick}
				/>
			</MenuDropdown>
		</Menu>
	);
};

export default HeaderMenu;
