import {
	ActionIcon,
	Button,
	Group,
	GroupProps,
	Pill,
	Stack,
	Text,
	useComputedColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { IconCopy, IconCopyCheck, IconInfoCircle } from "@tabler/icons-react";

import { Player } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import { useClipboard } from "@mantine/hooks";

interface Props extends Omit<GroupProps, "children"> {
	player: Player;
	filled: boolean;
}

const RoomPlayersItem = ({ player, filled, ...props }: Props) => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	const clipboard = useClipboard({ timeout: 2400 });

	const handleCopyToClipboard = (type: string, value: string) => {
		clipboard.copy(value);
		notifications.clean();
		notifications.show({
			title: `Copied ${type}`,
			message: `Copied ${value} to clipboard.`,
			autoClose: 2000,
			withBorder: true,
		});
	};

	const hasName: boolean = !player.name.trim() || player.name === "no name";

	return (
		<Group
			px="md"
			py="sm"
			bg={filled ? (computedColorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]) : undefined}
			justify="space-between"
			align="center"
			{...props}
		>
			<Stack
				key={player.pid}
				gap={0}
			>
				<Text
					fs={hasName ? "italic" : undefined}
					fw={600}
					truncate="end"
					c={hasName ? "dimmed" : undefined}
				>
					{hasName ? "No Name Found" : player.name}
				</Text>
				<Button
					variant="transparent"
					px={0}
					size="compact-xs"
					color="gray"
					fw={400}
					rightSection={clipboard.copied ? <IconCopyCheck size={12} /> : <IconCopy size={12} />}
					onClick={() => handleCopyToClipboard("friend code", player.fc)}
				>
					{player.fc}
				</Button>
			</Stack>
			{!player.ev ? (
				<ActionIcon
					variant="subtle"
					size="lg"
					color="gray"
				>
					<IconInfoCircle />
				</ActionIcon>
			) : (
				<Group
					justify="flex-end"
					align="center"
					gap="xs"
				>
					<Pill>{player.ev} VR</Pill>
					<Pill>{player.eb} BR</Pill>
				</Group>
			)}
		</Group>
	);
};

export default RoomPlayersItem;
