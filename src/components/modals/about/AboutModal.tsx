import { Button, Group, Stack } from "@mantine/core";
import { IconCode, IconGitBranch, IconPackage, IconSteeringWheel } from "@tabler/icons-react";

import { AboutItem } from ".";
import { modals } from "@mantine/modals";
import useRetroRewindVersion from "@/lib/hooks/queries/useRetroRewindVersion";

const AboutModal = () => {
	const { version } = useRetroRewindVersion();

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
				value="0.1.0"
			/>
			<AboutItem
				icon={IconSteeringWheel}
				label="Retro Rewind version"
				value={version}
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
