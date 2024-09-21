"use client";

import { ActionIcon, Group, GroupProps, Select, Tooltip } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Data {
	label: string;
	value: string;
	defaultReverseSortDirection: boolean;
}

interface Props extends Omit<GroupProps, "children"> {
	data: Data[];
	textValues?: string[];
	defaultValue: string;
}

const SortForm = ({ data, textValues = [], defaultValue, ...props }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [SortIcon, sortLabel] = useMemo(() => {
		const icon = searchParams.get("reverse") === "true" ? IconSortDescending2 : IconSortAscending2;

		let label = searchParams.get("reverse") === "true" ? "Sorting 9-0" : "Sorting 0-9";

		if (searchParams.has("sortBy") && textValues.includes(searchParams.get("sortBy") as string)) {
			label = searchParams.get("reverse") === "true" ? "Sorting Z-A" : "Sorting A-Z";
		}

		return [icon, label];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const handleSortByChange = (value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sortBy", value as string);
		params.set("reverse", (value as string) !== "name" ? "true" : "false");

		router.push(`${pathname}?${params.toString()}`);
	};

	const handleReverseSortDirectionChange = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("reverse", searchParams.get("reverse") === "true" ? "false" : "true");

		router.push(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		if (searchParams.size === 0) {
			handleSortByChange(defaultValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Group
			justify="flex-end"
			{...props}
		>
			<Select
				variant="unstyled"
				size="xs"
				maw={108}
				placeholder="Sort by"
				data={data}
				allowDeselect={false}
				rightSection={
					<Tooltip
						label={sortLabel}
						position="bottom-end"
					>
						<ActionIcon
							variant="subtle"
							size={20}
							color="gray"
							onClick={handleReverseSortDirectionChange}
						>
							<SortIcon />
						</ActionIcon>
					</Tooltip>
				}
				rightSectionPointerEvents="all"
				styles={{ input: { paddingRight: 30, textAlign: "right" } }}
				comboboxProps={{ width: 116, position: "bottom-end", offset: 0 }}
				value={searchParams.get("sortBy") ?? defaultValue}
				onChange={handleSortByChange}
			/>
		</Group>
	);
};

export default SortForm;
