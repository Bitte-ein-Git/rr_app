import {
	ActionIcon,
	AspectRatio,
	Box,
	Button,
	Group,
	GroupProps,
	Image,
	Pill,
	Popover,
	Stack,
	Text,
	Tooltip,
	useComputedColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { DEFAULT_SETTINGS_VRONLY, LOCALSTORAGE_VRONLY } from "@/lib/constants";
import { IconCopy, IconCopyCheck, IconInfoCircle } from "@tabler/icons-react";
import { useClipboard, useLocalStorage } from "@mantine/hooks";

import CyclingPill from "../../common/cycling-pill";
import { Player } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import useMii from "@/lib/hooks/queries/useMii";

interface Props extends Omit<GroupProps, "children"> {
	player: Player;
	filled: boolean;
}

const RoomPlayer = ({ player, filled, ...props }: Props) => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	const [vrOnly] = useLocalStorage<boolean>({
		key: LOCALSTORAGE_VRONLY,
		defaultValue: DEFAULT_SETTINGS_VRONLY,
	});

	const clipboard = useClipboard({ timeout: 2400 });

	const { imageData } = useMii(player);

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

	const hasNoName: boolean = !player.name.trim() || player.name === "no name";

	return (
		<Group
			px="md"
			py="sm"
			bg={filled ? (computedColorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]) : undefined}
			align="center"
			{...props}
		>
			{imageData && (
				<AspectRatio>
					<Image
						h={42}
						mt={-4}
						mr={-12}
						src={`data:image/png;base64,${imageData}`}
						alt={`${player.name}'s mii`}
					/>
				</AspectRatio>
			)}
			<Stack
				style={{ flexGrow: 1 }}
				justify="center"
				align="flex-start"
				gap={0}
			>
				<Text
					fs={hasNoName ? "italic" : undefined}
					fw={600}
					truncate="end"
					c={hasNoName ? "dimmed" : undefined}
				>
					{hasNoName ? "No name found" : player.name}
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
			{player.ev &&
				(vrOnly ? <Pill>{player.ev} VR</Pill> : <CyclingPill values={[`${player.ev} VR`, `${player.eb} BR`]} />)}
		</Group>
	);
};

export default RoomPlayer;
