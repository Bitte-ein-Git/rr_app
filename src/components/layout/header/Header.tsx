"use client";

import { APPSHELL_CONTAINER_SIZE, APPSHELL_HEADER_HEIGHT } from "@/lib/constants";
import { ActionIcon, Box, Container, Group, Image, Menu, Text, Tooltip } from "@mantine/core";
import { IconDotsVertical, IconInfoCircle, IconReload, IconSettings } from "@tabler/icons-react";

import AboutModal from "@/components/modals/about";
import { MenuItem } from ".";
import ModalTitle from "@/components/modals/ModalTitle";
import SettingsModal from "@/components/modals/settings";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import relativetime from "dayjs/plugin/relativeTime";
import useDuration from "@/lib/hooks/useDuration";
import { useEffect } from "react";
import useRetroRewindRooms from "@/lib/hooks/queries/useRetroRewindRooms";

dayjs.extend(relativetime);

const Header = () => {
	const { fetchStatus, refetch } = useRetroRewindRooms();
	const { duration, setDate } = useDuration();

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

	useEffect(() => {
		if (fetchStatus === "idle") {
			setDate(new Date());
		}
	}, [fetchStatus, setDate]);

	return (
		<Container
			size={APPSHELL_CONTAINER_SIZE}
			bg="transparent"
		>
			<Group
				h={APPSHELL_HEADER_HEIGHT}
				justify="space-between"
				align="center"
			>
				<Group gap="xs">
					<Image
						w={34}
						radius="xl"
						src="/favicon.svg"
						alt="Logo"
					/>
					<Box>
						<Text
							fw={700}
							lh={1.32}
						>
							Retro Rewind
						</Text>
						<Text
							fw={600}
							lh={1}
							size="xs"
							c="dimmed"
						>
							Status &amp; Rooms
						</Text>
					</Box>
				</Group>
				<Group gap={4}>
					<Tooltip
						label={
							<>
								<Text>Fetch rooms</Text>
								{duration && (
									<Text
										fs="italic"
										size="xs"
									>
										Last fetched {duration}
									</Text>
								)}
							</>
						}
						position="bottom-end"
					>
						<ActionIcon
							variant="subtle"
							color="gray"
							size="lg"
							loading={fetchStatus === "fetching"}
							loaderProps={{ type: "dots" }}
							onClick={() => refetch()}
						>
							<IconReload size={24} />
						</ActionIcon>
					</Tooltip>
					<Menu position="bottom-end">
						<Menu.Target>
							<ActionIcon
								variant="subtle"
								color="gray"
								size="lg"
							>
								<IconDotsVertical size={24} />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<MenuItem
								title="Settings"
								description="Adjust data fetching and theming"
								icon={IconSettings}
								onClick={handleSettingsClick}
							/>
							<MenuItem
								title="About"
								description="Development and app information"
								icon={IconInfoCircle}
								onClick={handleAboutClick}
							/>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Group>
		</Container>
	);
};

export default Header;
