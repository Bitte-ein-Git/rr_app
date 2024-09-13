import { Button, Group, Select, Stack, Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
	DEFAULT_SETTINGS_COLORSCHEME,
	DEFAULT_SETTINGS_REFRESHINTERVAL,
	DEFAULT_SETTINGS_VRONLY,
	LOCALSTORAGE_REFRESHINTERVAL,
	LOCALSTORAGE_VRONLY,
} from "../../../lib/constants";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";

import { CompoundInput } from ".";
import { modals } from "@mantine/modals";
import { useEffect } from "react";

const intervals = [
	{
		label: "None",
		value: "0",
	},
	{
		label: "30sec",
		value: "30",
	},
	{
		label: "1min",
		value: "60",
	},
	{
		label: "2min",
		value: "120",
	},
	{
		label: "5min",
		value: "300",
	},
	{
		label: "10min",
		value: "600",
	},
];

const SettingsModal = () => {
	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme(DEFAULT_SETTINGS_COLORSCHEME, { getInitialValueInEffect: true });

	const [refreshInterval, setRefreshInterval] = useLocalStorage<number>({
		key: LOCALSTORAGE_REFRESHINTERVAL,
		defaultValue: DEFAULT_SETTINGS_REFRESHINTERVAL,
	});

	const [vrOnly, setVROnly] = useLocalStorage<boolean>({
		key: LOCALSTORAGE_VRONLY,
		defaultValue: DEFAULT_SETTINGS_VRONLY,
	});

	const [dropdownOpened, { close, open }] = useDisclosure();

	const handleReset = () => {
		setColorScheme(DEFAULT_SETTINGS_COLORSCHEME);
		setRefreshInterval(DEFAULT_SETTINGS_REFRESHINTERVAL);
		setVROnly(DEFAULT_SETTINGS_VRONLY);
	};

	useEffect(() => {
		close();
	}, [close, refreshInterval]);

	return (
		<Stack>
			<CompoundInput
				label="Dark mode"
				description="Use darker tones reduce eye strain"
				onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
			>
				<Switch
					onLabel="ON"
					offLabel="OFF"
					size="md"
					checked={computedColorScheme === "dark"}
					onChange={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
				/>
			</CompoundInput>
			<CompoundInput
				label="Refresh interval"
				description="How often should data be fetched"
				onClick={open}
			>
				<Select
					w={88}
					data={intervals}
					value={refreshInterval.toString()}
					allowDeselect={false}
					onChange={v => setRefreshInterval(parseInt(v as string))}
					withCheckIcon={false}
					dropdownOpened={dropdownOpened}
					onDropdownClose={close}
				/>
			</CompoundInput>
			<CompoundInput
				label="Only show VR"
				description="Disable cycling of VR and BR ratings"
				onClick={() => setVROnly(!vrOnly)}
			>
				<Switch
					onLabel="ON"
					offLabel="OFF"
					size="md"
					checked={vrOnly}
					onChange={() => setVROnly(!vrOnly)}
				/>
			</CompoundInput>
			<Group
				justify="flex-end"
				align="center"
			>
				<Button
					variant="subtle"
					color="gray"
					onClick={handleReset}
				>
					Reset to default
				</Button>
				<Button onClick={() => modals.closeAll()}>Dismiss</Button>
			</Group>
		</Stack>
	);
};

export default SettingsModal;
