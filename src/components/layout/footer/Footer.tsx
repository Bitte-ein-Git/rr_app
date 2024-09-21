import {
	APPSHELL_CONTAINER_SIZE,
	APPSHELL_FOOTER_HEIGHT,
	URL_EXTERNAL_APP_REPOSITORY,
	URL_EXTERNAL_RETROREWIND_WIKI,
	URL_EXTERNAL_WHEELWIZARD_REPOSITORY,
} from "@/lib/constants";
import { Container, Group, Text } from "@mantine/core";
import { FooterBackToTop, FooterIcon } from ".";
import { IconBrandGithub, IconHelmet, IconSteeringWheel } from "@tabler/icons-react";

import FooterNavigation from "./navigation";

const Footer = () => {
	const year: number = new Date().getFullYear();

	return (
		<Container
			h={APPSHELL_FOOTER_HEIGHT}
			size={APPSHELL_CONTAINER_SIZE}
		>
			<FooterNavigation />
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
				<Group gap={4}>
					<FooterBackToTop />
					<FooterIcon
						label="Retro Rewind"
						icon={IconHelmet}
						href={URL_EXTERNAL_RETROREWIND_WIKI}
					/>
					<FooterIcon
						label="Wheel Wizard"
						icon={IconSteeringWheel}
						href={URL_EXTERNAL_WHEELWIZARD_REPOSITORY}
					/>
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
