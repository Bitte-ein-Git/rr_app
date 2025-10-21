import {
	APPSHELL_CONTAINER_SIZE,
	APPSHELL_FOOTER_HEIGHT,
	URL_EXTERNAL_APP_REPOSITORY,
	URL_EXTERNAL_RETROREWIND_WIKI,
	URL_EXTERNAL_WHEELWIZARD_REPOSITORY,
	BRAND_COPYRIGHT_HOLDER
} from "@/lib/constants";
import { Container, Group, Text } from "@mantine/core";
import { FooterBackToTop, FooterIcon } from ".";
import { IconBrandGithub, IconHelmet, IconSteeringWheel } from "@tabler/icons-react";

import FooterNavigation from "./navigation";

// footer component with navigation and links
const Footer = () => {
	const currentYear: number = new Date().getFullYear();
	const startYear = 2024; // copyright start year

	return (
		<Container
			h={APPSHELL_FOOTER_HEIGHT}
			size={APPSHELL_CONTAINER_SIZE}
		>
			{/* bottom navigation tabs */}
			<FooterNavigation />
			{/* copyright and external links */}
			<Group
				h={32}
				justify="space-between"
				align="center"
			>
				<Text
					size="xs"
					c="dimmed"
				>
					{/* dynamic copyright year */}
					&copy; {BRAND_COPYRIGHT_HOLDER} · {startYear}{currentYear !== startYear ? ` - ${currentYear}` : ''} · All rights reserved.
				</Text>
				<Group gap={4}>
					<FooterBackToTop />
					{/* external links */}
					<FooterIcon
						label="Retro Rewind Wiki"
						icon={IconHelmet}
						href={URL_EXTERNAL_RETROREWIND_WIKI}
					/>
					<FooterIcon
						label="Wheel Wizard Repo"
						icon={IconSteeringWheel}
						href={URL_EXTERNAL_WHEELWIZARD_REPOSITORY}
					/>
					<FooterIcon
						label="App GitHub Repo"
						icon={IconBrandGithub}
						href={URL_EXTERNAL_APP_REPOSITORY} // updated link
					/>
				</Group>
			</Group>
		</Container>
	);
};

export default Footer;

