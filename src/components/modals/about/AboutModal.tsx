import { AboutItem, AboutSectionTitle } from ".";
import { Button, Grid, Group } from "@mantine/core";
import { IconCode, IconGitBranch, IconHelmet, IconPackage, IconSteeringWheel } from "@tabler/icons-react";

import { modals } from "@mantine/modals";
import useAppVersion from "@/lib/hooks/queries/useAppVersion";
import useRetroRewindVersion from "@/lib/hooks/queries/useRetroRewindVersion";
import useWheelWizardVersion from "@/lib/hooks/queries/useWheelWizardVersion";

const AboutModal = () => {
	const { version: appVersion } = useAppVersion();
	const { version: retroRewindVersion } = useRetroRewindVersion();
	const { version: wheelWizardVersion } = useWheelWizardVersion();

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
					value={appVersion}
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
					value={`v${retroRewindVersion}`}
				/>
			</Grid.Col>
			<Grid.Col span={{ base: 6 }}>
				<AboutItem
					icon={IconSteeringWheel}
					label="Wheel Wizard"
					value={`v${wheelWizardVersion}`}
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
