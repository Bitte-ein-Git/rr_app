"use client";

import { AboutItem, AboutSectionTitle } from ".";
import { Button, Grid, Group } from "@mantine/core";
// Removed unused IconGitBranch from import
import { IconCode, IconHelmet, IconPackage, IconSteeringWheel } from "@tabler/icons-react";

import { BRAND_COPYRIGHT_HOLDER } from "@/lib/constants";
import { modals } from "@mantine/modals";
import useVersion from "@/lib/hooks/swr/useVersion";

// modal component displaying application and related software versions
const AboutModal = () => {
	// removed unused appVersion constant
	const retroRewindVersion = useVersion("retro-rewind");
	const wheelWizardVersion = useVersion("wheel-wizard");

	return (
		<Grid>
			<Grid.Col span={{ base: 12 }}>
				<AboutSectionTitle>Application</AboutSectionTitle>
			</Grid.Col>
			<Grid.Col span={{ base: 12 }}> {/* Changed span to 12 as the other column was removed */}
				<AboutItem
					icon={IconCode}
					label="Developed by"
					value={BRAND_COPYRIGHT_HOLDER}
				/>
			</Grid.Col>
			{/* Removed the Grid.Col that displayed appVersion */}
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
					// display version, handle loading state and potential missing data
					value={retroRewindVersion.isLoading ? "Fetching.." : (retroRewindVersion.data?.version && retroRewindVersion.data.version !== "N/A" ? `v${retroRewindVersion.data.version}`: "N/A")}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconSteeringWheel}
					label="Wheel Wizard"
					// display version, handle loading state and potential missing data
					value={wheelWizardVersion.isLoading ? "Fetching.." : (wheelWizardVersion.data?.version && wheelWizardVersion.data.version !== "N/A" ? `${wheelWizardVersion.data.version}`: "N/A")}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 12 }}>
				<Group
					justify="flex-end"
					align="center"
				>
					{/* close modal button */}
					<Button onClick={() => modals.closeAll()}>Dismiss</Button>
				</Group>
			</Grid.Col>
		</Grid>
	);
};

export default AboutModal;
