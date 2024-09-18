"use client";

import { APPSHELL_CONTAINER_SIZE, APPSHELL_FOOTER_HEIGHT, URL_EXTERNAL_APP_REPOSITORY } from "@/lib/constants";
import { Container, Group, Text, Transition } from "@mantine/core";
import { IconArrowUp, IconBrandGithub, IconUser, IconUsersGroup } from "@tabler/icons-react";

import { FooterIcon } from ".";
import FooterTab from "./FooterTab";
import useScrollToTop from "@/lib/hooks/useScrollToTop";

const Footer = () => {
	const { scroll, scrolling, scrollToTop } = useScrollToTop();

	const year: number = new Date().getFullYear();

	return (
		<Container
			h={`calc(${APPSHELL_FOOTER_HEIGHT} + env(safe-area-inset-bottom, 0))`}
			pb="env(safe-area-inset-bottom, 0)"
			size={APPSHELL_CONTAINER_SIZE}
		>
			<Group
				h={64}
				justify="center"
				align="stretch"
				px="xl"
				py={4}
				grow
			>
				<FooterTab
					icon={IconUsersGroup}
					href="/rooms"
				>
					Rooms
				</FooterTab>
				<FooterTab
					icon={IconUser}
					href="/players"
				>
					Players
				</FooterTab>
			</Group>
			<Group
				h={32}
				justify="space-between"
				align="center"
			>
				<Text
					size="xs"
					c="dimmed"
				>
					&copy; odysseus. · 2024{year !== 2024 && ` - ${year}`} · All rights reserved.
				</Text>
				<Group gap="xs">
					<Transition
						transition="slide-up"
						exitDuration={100}
						mounted={!scrolling && scroll.y > 0}
					>
						{transitionStyles => (
							<FooterIcon
								transitionStyles={transitionStyles}
								label="Back to top"
								icon={IconArrowUp}
								onClick={scrollToTop}
							/>
						)}
					</Transition>
					<FooterIcon
						label="GitHub"
						icon={IconBrandGithub}
						href={URL_EXTERNAL_APP_REPOSITORY}
					/>
				</Group>
			</Group>
		</Container>
	);
};

export default Footer;
