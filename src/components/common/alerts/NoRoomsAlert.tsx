import { Alert, AlertProps, Stack, Text } from "@mantine/core";

import { IconInfoCircle } from "@tabler/icons-react";

interface Props extends AlertProps {}

const NoRoomsAlert = ({ ...props }: Props) => {
	return (
		<Alert
			variant="light"
			title="No players found"
			icon={<IconInfoCircle />}
			color="gray"
			{...props}
		>
			<Stack gap="xs">
				<Text inherit>It appears there are no players currently playing Retro Rewind online.</Text>
				<Text inherit>Please check back in again soon.</Text>
			</Stack>
		</Alert>
	);
};

export default NoRoomsAlert;
