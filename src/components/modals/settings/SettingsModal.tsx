import { Button, Group, Select, Stack, Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { LOCALSTORAGE_REFRESHINTERVAL, SETTINGS_COLORSCHEME, SETTINGS_REFRESHINTERVAL } from "../../../lib/constants";
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
	const computedColorScheme = useComputedColorScheme(SETTINGS_COLORSCHEME, { getInitialValueInEffect: true });

	const [refreshInterval, setRefreshInterval] = useLocalStorage<number>({
		key: LOCALSTORAGE_REFRESHINTERVAL,
		defaultValue: SETTINGS_REFRESHINTERVAL,
	});

	const [dropdownOpened, { close, open }] = useDisclosure();

	const handleReset = () => {
		setColorScheme("light");
		setRefreshInterval(120);
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
					onChange={v => setRefreshInterval(parseInt(v as string))}
					withCheckIcon={false}
					dropdownOpened={dropdownOpened}
					onDropdownClose={close}
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
