import { Button, Group, Stack } from "@mantine/core";
import { IconCode, IconGitBranch, IconHelmet, IconPackage, IconSteeringWheel } from "@tabler/icons-react";

import { AboutItem } from ".";
import { modals } from "@mantine/modals";
import useAppVersion from "@/lib/hooks/queries/useAppVersion";
import useRetroRewindVersion from "@/lib/hooks/queries/useRetroRewindVersion";
import useWheelWizardVersion from "@/lib/hooks/queries/useWheelWizardVersion";

const AboutModal = () => {
	const { version: appVersion } = useAppVersion();
	const { version: retroRewindVersion } = useRetroRewindVersion();
	const { version: wheelWizardVersion } = useWheelWizardVersion();

	return (
		<Stack>
			<AboutItem
				icon={IconCode}
				label="Developed by"
				value="odysseus."
			/>
			<AboutItem
				icon={IconPackage}
				label="Built using"
				value="Next.js + Mantine"
			/>
			<AboutItem
				icon={IconGitBranch}
				label="Application version"
				value={appVersion}
			/>
			<AboutItem
				icon={IconHelmet}
				label="Retro Rewind version"
				value={retroRewindVersion}
			/>
			<AboutItem
				icon={IconSteeringWheel}
				label="Wheel Wizard version"
				value={wheelWizardVersion}
			/>
			<Group
				justify="flex-end"
				align="center"
			>
				<Button onClick={() => modals.closeAll()}>Dismiss</Button>
			</Group>
		</Stack>
	);
};

export default AboutModal;
