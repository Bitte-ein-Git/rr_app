import {
	AspectRatio,
	Button,
	Group,
	GroupProps,
	Image,
	Pill,
	Stack,
	Text,
	ThemeIcon,
	Tooltip,
	useComputedColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { DEFAULT_SETTINGS_VRONLY, LOCALSTORAGE_SETTINGS_VRONLY } from "@/lib/constants";
import { IconCopy, IconCopyCheck, IconHelp } from "@tabler/icons-react";
import { useClipboard, useLocalStorage } from "@mantine/hooks";

import CyclingPill from "../cycling-pill";
import { Player } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import useMii from "@/lib/hooks/queries/useMii";

interface Props extends Omit<GroupProps, "children"> {
	player: Player;
	filled: boolean;
}

const PlayerItem = ({ player, filled, ...props }: Props) => {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

	const [vrOnly] = useLocalStorage<boolean>({
		key: LOCALSTORAGE_SETTINGS_VRONLY,
		defaultValue: DEFAULT_SETTINGS_VRONLY,
	});

	const clipboard = useClipboard({ timeout: 2400 });

	const { imageData } = useMii(player);

	const handleCopyToClipboard = (type: string, value: string) => {
		clipboard.copy(value);
		notifications.clean();
		notifications.show({
			title: `Copied ${type}`,
			message: `${value} copied to clipboard`,
			autoClose: 1600,
			withBorder: true,
		});
	};

	const hasNoName: boolean = !player.name.trim() || player.name === "no name";

	return (
		<Group
			px="md"
			py="xs"
			bg={filled ? (computedColorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]) : undefined}
			align="center"
			wrap="nowrap"
			gap="sm"
			{...props}
		>
			{imageData && (
				<AspectRatio>
					<Image
						w={42}
						h={42}
						mt={-6}
						mx={-6}
						src={`data:image/png;base64,${imageData}`}
						alt={`${player.name}'s mii`}
					/>
				</AspectRatio>
			)}
			<Stack
				style={{ flexGrow: 1, overflow: "hidden" }}
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
					{hasNoName ? "Player" : player.name}
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
			{player.ev ? (
				vrOnly ? (
					<Pill>{player.ev} VR</Pill>
				) : (
					<CyclingPill
						miw={80}
						values={[`${player.ev} VR`, `${player.eb} BR`]}
					/>
				)
			) : (
				<Tooltip
					maw={156}
					label="VR/BR not available in private rooms"
					multiline
					position="left"
				>
					<ThemeIcon
						variant="subtle"
						color="gray"
					>
						<IconHelp />
					</ThemeIcon>
				</Tooltip>
			)}
		</Group>
	);
};

export default PlayerItem;
