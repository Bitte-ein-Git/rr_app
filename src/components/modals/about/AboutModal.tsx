"use client";

import { AboutItem, AboutSectionTitle } from ".";
import { Button, Grid, Group } from "@mantine/core";
import { IconCode, IconGitBranch, IconHelmet, IconPackage, IconSteeringWheel } from "@tabler/icons-react";

import { modals } from "@mantine/modals";
import useVersion from "@/lib/hooks/swr/useVersion";

const AboutModal = () => {
	const appVersion = useVersion("app");
	const retroRewindVersion = useVersion("retro-rewind");
	const wheelWizardVersion = useVersion("wheel-wizard");

	return (
		<Grid>
			<Grid.Col span={{ base: 12 }}>
				<AboutSectionTitle>Application</AboutSectionTitle>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconCode}
					label="Developed by"
					value="odysseus."
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconGitBranch}
					label="Latest release"
					value={appVersion.isLoading ? "Fetching.." : appVersion.data?.version}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 12 }}>
				<AboutItem
					icon={IconPackage}
					label="Built using"
					value="Next.js + Mantine"
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 12 }}>
				<AboutSectionTitle>Versions</AboutSectionTitle>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconHelmet}
					label="Retro Rewind"
					value={retroRewindVersion.isLoading ? "Fetching.." : `v${retroRewindVersion.data?.version}`}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconSteeringWheel}
					label="Wheel Wizard"
					value={wheelWizardVersion.isLoading ? "Fetching.." : `v${wheelWizardVersion.data?.version}`}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 12 }}>
				<Group
					justify="flex-end"
					align="center"
				>
					<Button onClick={() => modals.closeAll()}>Dismiss</Button>
				</Group>
			</Grid.Col>
		</Grid>
	);
};

export default AboutModal;
